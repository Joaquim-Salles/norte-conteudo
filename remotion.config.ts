import {Config} from '@remotion/cli/config';

// Qualidade visual acima de velocidade de render (Regra Inviolavel #1 do Rafael).
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setConcurrency(2);
