
export const loginUser = async (username, password) => {
  const response = await fetch('http://127.0.0.1:8000/accounts/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) throw new Error('Login failed');

  const data = await response.json();
  localStorage.setItem('accessToken', data.access);
  localStorage.setItem('refreshToken', data.refresh);
  return data;
};

export const signupUser = async (userData) => {
  const response = await fetch('http://127.0.0.1:8000/accounts/signup/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.password?.join(", ") || 
      data?.email?.join(", ") || 
      data?.username?.join(", ") || 
      data?.non_field_errors?.join(", ") || 
      "Signup failed"
    );
  }

  return data;
};
