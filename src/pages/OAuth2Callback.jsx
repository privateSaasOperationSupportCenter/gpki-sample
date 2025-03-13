import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "../contexts/auth";

export default function OAuth2Callback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getAccessToken } = useAuth();

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      getAccessToken(code)
    }
    navigate("/");
  }, [])

  return <></>;
}