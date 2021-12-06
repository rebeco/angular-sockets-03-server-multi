import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/sockets';

export const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
  res.json({ ok: true, mensaje: 'Todo está bien!!' });
});

router.post('/mensajes', (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;

  const payload = {
    de: de,
    cuerpo: cuerpo,
  };

  const server = Server.instance;
  server.io.emit('mensaje-nuevo', payload);
  res.json({ ok: true, cuerpo: cuerpo, de: de });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  const id = req.params.id;

  const payload = {
    de: de,
    cuerpo: cuerpo,
  };

  const server = Server.instance;
  server.io.in(id).emit('mensaje-privado', payload);
  res.json({ ok: true, cuerpo: cuerpo, de: de, id: id });
});

router.get('/usuarios', (req: Request, res: Response) => {
  const server = Server.instance;
  server.io
    .allSockets()
    .then((clientes) => {
      res.json({
        ok: true,
        clientes: Array.from(clientes),
      });
    })
    .catch((err) => {
      res.json({
        ok: false,
        err: err,
      });
    });
});

router.get('/usuarios/detalle', (req: Request, res: Response) => {
  res.json({
    ok: true,
    clientes: usuariosConectados.getLista(),
  });
});
