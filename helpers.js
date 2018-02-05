// Some details about the site
exports.siteName = `Locals App`;
exports.options = [
    {slug: '/add', title: 'Stores', icon: 'store',}
]
// Function I found online that helps make a static map
// lng then lat because MongoDB gives lng, lat instead of lat lng
exports.staticMap = ([lng, lat]) => `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x150&key=${process.env.MAP_KEY}&markers=${lat},${lng}&scale=2`;

exports.dump = (obj) => JSON.stringify(obj, null, 2);
