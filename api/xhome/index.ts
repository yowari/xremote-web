import { AzureFunction } from '@azure/functions';
import { proxy } from '../utils/proxy';

const httpTrigger: AzureFunction = proxy('xremote.free.beeceptor.com');

export default httpTrigger;
