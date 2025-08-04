import axios from 'axios';
import fs from 'fs';
import { BadRequestError } from '../core/error.response';

const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY!;

export const handleProcessTranscribeAudio = async (filePath: string) => {
  const uploadUrl = await uploadToAssemblyAI(filePath);

  if (!uploadUrl) throw new BadRequestError("Error while getting upload url from Assembly AI");

  const transcriptId = await requestTranscription(uploadUrl);

  if (!transcriptId) throw new BadRequestError("Error while getting transcript id from Assembly AI");

  await pollTranscription(transcriptId);

  const sentences = await getSentences(transcriptId);

  return sentences;
}

const uploadToAssemblyAI = async (filePath: string): Promise<string> => {
  const file = fs.createReadStream(filePath);
  const response = await axios.post(
    'https://api.assemblyai.com/v2/upload',
    file,
    {
      headers: {
        authorization: ASSEMBLYAI_API_KEY,
        'transfer-encoding': 'chunked',
      },
    }
  );

  return response.data.upload_url;
};

const requestTranscription = async (audioUrl: string): Promise<string> => {
  const response = await axios.post(
    'https://api.assemblyai.com/v2/transcript',
    {
      audio_url: audioUrl,
      speaker_labels: true,
    },
    {
      headers: {
        authorization: ASSEMBLYAI_API_KEY,
        'content-type': 'application/json',
      },
    }
  );

  return response.data.id;
};

const pollTranscription = async (transcriptId: string, maxRetries = 30): Promise<any> => {
  const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;
  let retryCount = 0;

  while (retryCount < maxRetries) {
    const response = await axios.get(pollingEndpoint, {
      headers: { authorization: ASSEMBLYAI_API_KEY },
    });

    if (response.data.status === 'completed') return response.data;
    if (response.data.status === 'error') throw new Error(response.data.error);

    retryCount++;
    await new Promise((res) => setTimeout(res, 3000));
  }

  throw new Error("Polling timed out after multiple attempts.");
};


const getSentences = async (transcriptId: string) => {
  const sentencesRes = await axios.get(
    `https://api.assemblyai.com/v2/transcript/${transcriptId}/sentences`,
    { headers: { authorization: ASSEMBLYAI_API_KEY } }
  );

  return sentencesRes.data;
}


