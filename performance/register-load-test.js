import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 10, // usuários virtuais
  duration: "10s", // tempo de execução
};

export default function () {
  const payload = JSON.stringify({
    username: `user_${Math.random()}`, // gera username único
    password: "123456",
    favorecidos: ["mateus", "joão"]
  });

  const params = {
    headers: { "Content-Type": "application/json" },
  };

  let res = http.post(process.env.BASE_URL_REST, payload, params);

  check(res, {
    "status é 201": (r) => r.status === 201,
    "resposta contém username": (r) => r.body.includes("username"),
    "resposta contém saldo": (r) => r.body.includes("saldo"),
  });

  sleep(1);
}
