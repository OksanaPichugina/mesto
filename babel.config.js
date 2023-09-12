const presets = [
    ['@babel/env',{
        targets: {
            ie: '11',
            chrome: '64'
        },
        useBuilInts: "entry",
    }]
];

module.export = { presets }