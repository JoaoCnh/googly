module.exports = {
  type: "react-app",
  webpack: {
    extra: {
      module: {
        rules: [
          {
            test: /\.md$/,
            use: "raw-loader"
          }
        ]
      }
    }
  }
};
