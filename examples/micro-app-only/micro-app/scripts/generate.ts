import { generateMfExposeDeclaration } from '@attachments/module-federation-toolkits';
import appConfig from '../app-config';

export const generate = async () => {
  await generateMfExposeDeclaration(appConfig);
};

generate().catch(e => {
  console.log(e);
});
