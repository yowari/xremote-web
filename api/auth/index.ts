import { AzureFunction } from '@azure/functions';
import { proxy } from '../utils/proxy';

const httpTrigger: AzureFunction = proxy('xhome.gssv-play-prod.xboxlive.com');

export default httpTrigger;
