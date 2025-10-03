import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 10,          // 20 usuários virtuais
  duration: "10s",  // durante 15 segundos
};

export default function () {
  const url = "http://localhost:3000/users/login";

  const payload = JSON.stringify({
    username: "luciana",
    password: "123456"
  });

  const params = {
    headers: { "Content-Type": "application/json" },
  };

  let res = http.post(url, payload, params);

  check(res, {
    "status é 200": (r) => r.status === 200,
    "resposta contém token": (r) => r.body.includes("token"),
  });

  sleep(1); // pausa de 1s entre execuções
}
