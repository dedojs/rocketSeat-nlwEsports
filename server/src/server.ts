import { PrismaClient } from '@prisma/client';
import express, { response } from 'express'
import cors from 'cors';
import convertMinutesToString from './utils/convert-minutes-to-hour-string';
import convertHourStringToMinutes from './utils/convertHourStringToMinute';

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

const PORT = 3333;

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
        _count: {
          select: {
            ads: true,
          }
        } 
    }
  })
  
  return response.status(201).json(games)
})

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    }
  })
  const formatedAds:Object = ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(',').map((day: any) => {
        if (day === '0') return 'Sun'
        if (day === '1') return 'Mon'
        if (day === '2') return 'Tue'
        if (day === '3') return 'Wed'
        if (day === '4') return 'Thi'
        if (day === '5') return 'Sat'
        if (day === '5') return 'Sun'
      }),
      hourStart: convertMinutesToString(ad.hourStart),
      hourEnd: convertMinutesToString(ad.hourEnd),
    }
  })
  return response.status(201).json(formatedAds)
})

app.get('/ads/:id/discord', async (request, response) => {
  const adId: string = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId
    }
  });
  return response.status(201).json({ discord: ad.discord });
})

app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
  const {
    name,
    yearsPlaying,
    discord,
    weekDays,
    hourStart,
    hourEnd,
    useVoiceChannel } = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays: weekDays.join(','),
      hourStart: convertHourStringToMinutes(hourStart),
      hourEnd: convertHourStringToMinutes(hourEnd),
      useVoiceChannel
    }
  })

  return response.status(201).json(ad); 
})

app.listen(PORT, () => console.log( `Aplicação rodando na porta ${PORT}`));