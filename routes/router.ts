import { Router, Request, Response } from 'express';
import Server from '../class/server';
import { usuariosConectados } from '../sockets/socket';


const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {

  res.json({
    ok: true,
    msg: 'Todo esta bien!'
  });

});

router.post('/mensajes', (req: Request, res: Response) => {

  const cuerpo = req.body.cuerpo;
  const de = req.body.de;

  const server = Server.instance;

  const payload = { de, cuerpo };
  server.io.emit('mensaje-nuevo', payload);

  res.json({
    ok: true,
    cuerpo,
    de,
  });

});


router.post('/mensajes/:id', (req: Request, res: Response) => {

  const cuerpo = req.body.cuerpo;
  const de = req.body.de;

  const { id } = req.params;

  const payload = {
    de,
    cuerpo
  }
  const server = Server.instance;

  server.io.in(id).emit('mensaje-privado', payload);

  res.json({
    ok: true,
    cuerpo,
    de,
    id,
  });

});


// Servicio para obtener todos los ids de los usuarios

router.get('/usuarios', async (req: Request, res: Response) => {

  const server = Server.instance;

  server.io.allSockets()

  try {
    const clientes = Array.from(await server.io.allSockets())
    res.json({
      ok: true,
      clientes,
    })
  } catch (error) {
    res.json({
      ok: false,
      error,
    })
  }

});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', async (req: Request, res: Response) => {


  res.json({
    ok: true,
    clientes: usuariosConectados.getLista()
  })

});


export default router;