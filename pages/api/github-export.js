import { Octokit } from "octokit";

export default async function handler(req, res) {
  const { repoName, content } = req.body;

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  try {
    const user = await octokit.request("GET /user");

    await octokit.request("POST /user/repos", {
      name: repoName,
      auto_init: true,
      private: false,
    });

    const encoded = Buffer.from(
      `# ${repoName}\n\n### App Type\n${content.appType}\n\n### Features\n${content.features}\n\n### Database\n${content.database}`
    ).toString("base64");

    await octokit.request("PUT /repos/{owner}/{repo}/contents/README.md", {
      owner: user.data.login,
      repo: repoName,
      path: "README.md",
      message: "Initial commit from Sakura Build",
      content: encoded,
    });

    res.status(200).json({ message: `✅ Created GitHub repo: ${repoName}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ GitHub export failed" });
  }
}
// GitHub export API logic here
