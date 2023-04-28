/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        MONGODB_URI: "mongodb+srv://mahdi:test1234@cluster0.8fsqciq.mongodb.net/sku-?retryWrites=true&w=majority",
        BASEURL: "http://localhost:3000/api",
        BASESERVER: "http://localhost:3000",
        JWT_KEY: "hhhhhugtctytrswzsdfhguhy67t5r4edercfghjnmijuhgtfdeswexdgfkuhgfded",
        RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED: "false",
        CHANGE_PASS_KEY: "DA4DB34155A918E3B597723C22DEF",
        CLIENT_ID: "262160564680-cq3dt5mo3gjlrs02qbbummr29pdusbmg.apps.googleusercontent.com",
        CLIENT_SECRET: "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",
        REDIRECT_URI: "https://developers.google.com/oauthplayground",
        REFERSH_TOKEN: "1//04d6A3we96rk3CgYIARAAGAQSNwF-L9IrUDXuaLM399Ep-SUBdK5mx1WD9EuH9girZy0nbmzPnBhK4VbTbaHjOjijjzUoXK-ua1E",
    },
    staticPageGenerationTimeout: 10000,
    images: {
        domains: [
            "imgv3.fotor.com",
            "imgv3.fotor.com",
            "assets.stickpng.com",
            "www.w3schools.com",
            "farzanehnorouzi.ir",
            "www.citypng.com",
            "drive.google.com",
        ],
    },
};

module.exports = nextConfig;
