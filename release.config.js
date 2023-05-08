module.exports = {
  repositoryUrl: 'https://github.com/CyriacduChatenet/Travel-tailor',
  branches: ['main'],
  plugins: [
    "@semantic-release/commit-analyzer", 
    "@semantic-release/github",
    ["@semantic-release/npm", {
      npmPublish: false
    }],
    ["@semantic-release/release-notes-generator"],
    ["@semantic-release/changelog"],
    ["@semantic-release/git", {
      "assets": ["package.json"],
      "message": "[CHORE](release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
    }]
  ],
}