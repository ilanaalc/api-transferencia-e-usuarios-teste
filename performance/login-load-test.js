import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 20,          // 20 usuários virtuais
  duration: "15s",  // durante 15 segundos
};

export default function () {

  const payload = JSON.stringify({
    username: "luciana",
    password: "123456"
  });

  const params = {
    headers: { "Content-Type": "application/json" },
  };

  let res = http.post(process.env.BASE_URL_REST, payload, params);

  check(res, {
    "status é 200": (r) => r.status === 200,
    "resposta contém token": (r) => r.body.includes("token"),
  });

  sleep(1); // pausa de 1s entre execuções
}
