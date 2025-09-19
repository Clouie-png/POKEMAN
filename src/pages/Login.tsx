import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = ({ onSwitch }: { onSwitch: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch('http://localhost/Pokeman/POKEMAN/backend/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login successful");
      localStorage.setItem('user', JSON.stringify(data.data));
      navigate('/dashboard');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <Button className="w-full" onClick={handleLogin}>Login</Button>
      <p className="text-sm text-center">
        Don't have an account?{" "}
        <Button variant="link" onClick={onSwitch}>
          Register
        </Button>
      </p>
    </div>
  );
};

export default Login;
