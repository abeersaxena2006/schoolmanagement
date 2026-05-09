const { createSchool, getAllSchools } = require('../models/schoolModel');
const { haversineDistance } = require('../utils/distance');

// ── helpers ──────────────────────────────────────────────────────────────────

function isNonEmptyString(val) {
  return typeof val === 'string' && val.trim().length > 0;
}

function isValidCoordinate(val) {
  const n = Number(val);
  return !isNaN(n) && isFinite(n);
}

// ── POST /addSchool ───────────────────────────────────────────────────────────

async function addSchool(req, res) {
  try {
    const { name, address, latitude, longitude } = req.body;

    // ---- validation ----
    const errors = [];

    if (!isNonEmptyString(name))    errors.push('name must be a non-empty string.');
    if (!isNonEmptyString(address)) errors.push('address must be a non-empty string.');

    if (!isValidCoordinate(latitude))
      errors.push('latitude must be a valid number.');
    else if (Number(latitude) < -90 || Number(latitude) > 90)
      errors.push('latitude must be between -90 and 90.');

    if (!isValidCoordinate(longitude))
      errors.push('longitude must be a valid number.');
    else if (Number(longitude) < -180 || Number(longitude) > 180)
      errors.push('longitude must be between -180 and 180.');

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // ---- insert ----
    const school = await createSchool({
      name:      name.trim(),
      address:   address.trim(),
      latitude:  parseFloat(latitude),
      longitude: parseFloat(longitude),
    });

    return res.status(201).json({
      success: true,
      message: 'School added successfully.',
      data:    school,
    });
  } catch (err) {
    console.error('[addSchool]', err);
    return res.status(500).json({ success: false, message: 'Failed to add school.' });
  }
}

// ── GET /listSchools ──────────────────────────────────────────────────────────

async function listSchools(req, res) {
  try {
    const { latitude, longitude } = req.query;

    // ---- validation ----
    const errors = [];

    if (!isValidCoordinate(latitude))
      errors.push('Query param latitude must be a valid number.');
    else if (Number(latitude) < -90 || Number(latitude) > 90)
      errors.push('latitude must be between -90 and 90.');

    if (!isValidCoordinate(longitude))
      errors.push('Query param longitude must be a valid number.');
    else if (Number(longitude) < -180 || Number(longitude) > 180)
      errors.push('longitude must be between -180 and 180.');

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    // ---- fetch & sort ----
    const schools = await getAllSchools();

    const sorted = schools
      .map((school) => ({
        ...school,
        distance_km: parseFloat(
          haversineDistance(userLat, userLon, school.latitude, school.longitude).toFixed(4)
        ),
      }))
      .sort((a, b) => a.distance_km - b.distance_km);

    return res.status(200).json({
      success: true,
      count:   sorted.length,
      data:    sorted,
    });
  } catch (err) {
    console.error('[listSchools]', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch schools.' });
  }
}

module.exports = { addSchool, listSchools };
