const apiUrl = process.env.API_URL;

const loginUser = async (email: string, password: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();

    if (res.ok) {
      // server returned status code within [200, 299]
      return { success: true, msg: result.msg };
    } else {
      return { success: false, msg: result.msg };
    }
  } catch (err) {
    return { success: false, msg: "Error during login" };
  }
};

const registerUser = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    const res = await fetch(`${apiUrl}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const result = await res.json();

    if (res.ok) {
      return { success: true, msg: result.msg };
    } else {
      return { success: false, msg: result.msg };
    }
  } catch (err) {
    return { success: false, msg: "Error during registration" };
  }
};

export default { registerUser, loginUser };
