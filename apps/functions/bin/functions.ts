#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { FunctionsStack } from '../lib/functions-stack';

const app = new cdk.App();
new FunctionsStack(app, 'FunctionsStack');
