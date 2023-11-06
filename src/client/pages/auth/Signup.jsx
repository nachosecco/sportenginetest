import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@wasp/queries";
import { signup } from "@wasp/auth";

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const { data: teams } = useQuery(getTeams);
  const { data: roles } = useQuery(getRoles);
  const [teamOptions, setTeamOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (teams) {
      setTeamOptions(teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>));
    }
    if (roles) {
      setRoleOptions(roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>));
    }
  }, [teams, roles]);

  const onSubmit = async (data) => {
    try {
      await signup({ 
        username: data.username, 
        password: data.password, 
        role: data.role, 
        team: data.team 
      });
      history.push("/dashboard");
    } catch (error) {
      console.error("Signup failed: ", error);
      setError("Signup failed: " + error.message);
    }
  };

  return (
    <div className="w-full h-full bg-white">
      <div className="min-w-full min-h-[75vh] flex items-center justify-center">
        <div className="w-full h-full max-w-sm p-5 bg-white">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register("username")} placeholder="Username" />
              <input {...register("password")} placeholder="Password" type="password" />
              <select {...register("role")}>
                {roleOptions}
              </select>
              <select {...register("team")}>
                {teamOptions}
              </select>
              <input type="submit" />
            </form>
            {error && <div>{error}</div>}
            <div className="mt-4 text-center">
              If you already have an account go to{" "}
              <Link to="/login" className="text-primary-500 hover:text-primary-800 underline">
                login
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}