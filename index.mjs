import axios from 'axios';

const GITHUB_API_BASE = "https://api.github.com/repos";
const GITHUB_REPO = "e-pub/bfdance";  // 실제 GitHub 저장소 경로
const TOKEN = process.env.GITHUB_TOKEN;  // 환경 변수에서 토큰 가져오기

export const handler = async (event) => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE}/${GITHUB_REPO}/contents/data/adminList.json`, {
      headers: { Authorization: `token ${TOKEN}` },
    });

    const adminList = JSON.parse(Buffer.from(response.data.content, 'base64').toString('utf-8'));
    const newAdmin = { username: "newAdmin", email: "newadmin@example.com", role: "admin" };
    adminList.push(newAdmin);

    await axios.put(`${GITHUB_API_BASE}/${GITHUB_REPO}/contents/data/adminList.json`, {
      message: "Add new admin",
      content: Buffer.from(JSON.stringify(adminList, null, 2)).toString('base64'),
      sha: response.data.sha,
    }, { headers: { Authorization: `token ${TOKEN}` } });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Admin added successfully", adminList }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to update adminList", error: error.message }),
    };
  }
};
