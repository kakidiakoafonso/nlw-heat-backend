import {server} from './serve'

server.listen(400, () => {
    console.log('listening on *:400');
  });