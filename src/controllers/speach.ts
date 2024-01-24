import { Request, Response } from 'express';
import { PassThrough } from 'node:stream';
const textToSpeech = require('@google-cloud/text-to-speech');
const client = new textToSpeech.TextToSpeechClient()
import OpenAI from "openai";


const openai = new OpenAI({
    apiKey: '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'
});

export const askOpenai = async (req: Request, res: Response) => {
    try {
        const question = req.body.text;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "assistant", content: `please answer next question: ${question}?` }],
            model: "gpt-3.5-turbo",
          });

          console.log(completion.choices[0].message.content);


        const request = {
            input: { text: completion.choices[0].message.content },
            voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
            audioConfig: { audioEncoding: 'MP3' },
        };


        res.set({
            'Content-Type': 'audio/mpeg',
            'Transfer-Encoding': 'chunked'
        })

        const [response] = await client.synthesizeSpeech(request)
        const bufferStream = new PassThrough()
        bufferStream.end(Buffer.from(response.audioContent))
        bufferStream.pipe(res)
    } catch (error) {
        console.log('error', error);
    }
}


export const handleSpeech = async (req: Request, res: Response) => {
    try {
        const speech = req.body.text;


        const request = {
            input: { text: speech },
            voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
            audioConfig: { audioEncoding: 'MP3' },
        };


        res.set({
            'Content-Type': 'audio/mpeg',
            'Transfer-Encoding': 'chunked'
        })

        const [response] = await client.synthesizeSpeech(request)
        const bufferStream = new PassThrough()
        bufferStream.end(Buffer.from(response.audioContent))
        bufferStream.pipe(res)
    } catch (error) {
        console.log('error', error);
    }
};
