DROP TABLE users;
DROP TABLE characters;

CREATE TABLE users (
  _id VARCHAR(30) PRIMARY KEY,
  __created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  __modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  __sessions JSONB[] NOT NULL DEFAULT '{}',
  __last_session JSONB NOT NULL DEFAULT '{}'::JSONB,
  player VARCHAR(30) NOT NULL,
  status VARCHAR(10) NOT NULL DEFAULT 'offline',
  permissions JSONB NOT NULL DEFAULT '{"__GLOBAL__":  {}, "__CHARACTER__":  {}}'::JSONB
);

CREATE TABLE characters (
  _id VARCHAR(30) PRIMARY KEY,
  __created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  __modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name VARCHAR(100) NOT NULL,
  source VARCHAR(20) NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::JSONB
);

CREATE TABLE trackers (
  _id VARCHAR(30) PRIMARY KEY,
  __created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  __modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name VARCHAR(100) NOT NULL,
  characters VARCHAR(30)[] NOT NULL DEFAULT '{}'
);

SELECT __sessions[1], __last_session FROM users;
SELECT * FROM users;
SELECT array_append(__sessions, __last_session) FROM users;

UPDATE users SET __sessions = array_append(__sessions, __last_session) WHERE _id = 'dsalexan'


SELECT * FROM characters;
DELETE FROM characters WHERE 1 = 1;