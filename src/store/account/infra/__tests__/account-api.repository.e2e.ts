import "reflect-metadata"
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { DockerComposeEnvironment, StartedDockerComposeEnvironment } from "testcontainers"
import { Pool } from "pg";
import { AppStore, createStore } from "@/store/store";
import { createContainer } from "@/injection/container";
import { registerThunk } from "@/store/auth/usecases/register.usecase";

describe("Test API account", () => {
  let backendContainer: StartedDockerComposeEnvironment
  let pool: Pool
  let store: AppStore

  beforeEach(async () => {
    store = createStore(createContainer())
    const backContainer = new DockerComposeEnvironment("./", "compose.yml")
    backendContainer = await backContainer.up()
    await backendContainer.getContainer("backend-1").exec(["node", "ace", "migration:run"])
    pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "feedback",
      password: "postgres",
      port: 5432
    })
  })

  afterEach(async () => {
    await pool.end()
    await backendContainer.down()
  })

  test("register usecase", {timeout: 20000}, async () => {
    await store.dispatch(registerThunk({
      email: "test@test.fr",
      confirmationPassword: "password",
      password: "password"
    }))
    
    const users = await pool.query("SELECT * FROM accounts WHERE email = $1 LIMIT 1", ["test@test.fr"])
    const expectedUser = users.rows[0]

    expect(expectedUser).toMatchObject({
      email: "test@test.fr",
      password: expect.any(String),
      id: expect.any(String),
    })
  })
})