import { AzureFunction } from '@azure/functions';
import { proxy } from '../utils/proxy';

const httpTrigger: AzureFunction = proxy('uks.gssv-play-prodxhome.xboxlive.com');

export default httpTrigger;
