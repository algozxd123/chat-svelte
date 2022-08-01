const register = async (username: string, email: string, password: string) => {
  const response = await fetch('http://localhost:3000/api/signup',{
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password
    }),
    headers: {
      "Content-type": "application/json"
    }
  });

  const data = await response.json();

  if(data.error) return { error: data.error };

  return { message: 'User was created' };
};

const login = async (email: string, password: string) => {
  const response = await fetch('http://localhost:3000/api/login',{
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
    headers: {
      "Content-type": "application/json"
    }
  });

  const data = await response.json();

  if(data.error) return { error: data.error };

  return data;
};

export { register, login };