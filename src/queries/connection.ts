import pgp from 'pg-promise'

if (global.connection === undefined) {
  const connection = pgp()({
    host: 'localhost',
    port: 5432,
    database: 'december',
    user: 'postgres',
    password: 'thinker',
  })

  global.connection = connection
}
