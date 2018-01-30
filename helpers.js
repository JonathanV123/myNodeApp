// Some details about the site
exports.siteName = `Locals App`;

exports.options = [
    {slug: '/add', title: 'Stores', icon: 'store',}
]

exports.dump = (obj) => JSON.stringify(obj, null, 2);
