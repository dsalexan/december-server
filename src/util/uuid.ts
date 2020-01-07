import uuid from 'uuid/v4'

export default (s = 7): string => uuid().substr(s)
