import { Injectable } from '@nestjs/common';
// import * as dotenv from 'dotenv';
// dotenv.config();

// import OpenAI from 'openai';

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

@Injectable()
export class MakeMeSayService {
  //   async queryGPT(query: string): Promise<string> {
  //     console.log('query', query);
  //     if (!query || query.length === 0 || query.length > 80) {
  //       throw new Error('No query provided');
  //     }
  //     const chatCompletion = await openai.chat.completions.create({
  //       messages: [{ role: 'user', content: query }],
  //       model: 'gpt-3.5-turbo-1106',
  //       max_tokens: 100,
  //     });
  //     const response = chatCompletion.choices[0].message.content;
  //     return JSON.stringify(chatCompletion);
  //   }
}

// import assert from "node:assert";
// import { get_encoding, encoding_for_model } from "tiktoken";

// const enc = get_encoding("gpt2");
// assert(
//   new TextDecoder().decode(enc.decode(enc.encode("hello world"))) ===
//     "hello world"
// );

// // To get the tokeniser corresponding to a specific model in the OpenAI API:
// const enc = encoding_for_model("text-davinci-003");

// // Extend existing encoding with custom special tokens
// const enc = encoding_for_model("gpt2", {
//   "<|im_start|>": 100264,
//   "<|im_end|>": 100265,
// });

// // don't forget to free the encoder after it is not used
// enc.free();
