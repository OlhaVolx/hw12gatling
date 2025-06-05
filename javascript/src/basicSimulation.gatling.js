import { simulation, atOnceUsers, global, scenario, getParameter, rampUsers, stressPeakUsers } from "@gatling.io/core";
import { http } from "@gatling.io/http";
import { status } from "@gatling.io/http";

export default simulation((setUp) => {
  // Load VU count from system properties
  // Reference: https://docs.gatling.io/guides/passing-parameters/


  // Define HTTP configuration
  // Reference: https://docs.gatling.io/reference/script/protocols/http/protocol/
  const httpProtocol = http
    .baseUrl("https://api.clickup.com")
    .acceptHeader("application/json")
    .authorizationHeader('pk_200540491_3FMEUMKFYSHLLEJKP2N95SH4DUXSTYCN')


  // Define scenario
  // Reference: https://docs.gatling.io/reference/script/core/scenario/
  const scn = scenario("Scenario").exec(http("Session").get("/api/v2/user").check(status().is(200)))


  // Define injection profile and execute the test
  // Reference: https://docs.gatling.io/reference/script/core/injection/
  setUp(scn.injectOpen(rampUsers(10).during(20), stressPeakUsers(100).during(5), rampUsers(10).during(20)))
    .protocols(httpProtocol);
});
