# Example open-source repo for Scaling DynamoDB Capacity using AWS-CDK L1 Construct Library that does not natively support auto-scaling in CfnTable construct

If you are using only L1 constructs in your application, then DynamoDB tables Level 1 construct (CfnTable), does not natively support auto-scaling for local table, so how does one implement the Autoscaling for provisioned read/writes ? 

Note: CfnTable  does however support Autoscaling for the Global Tables in CloudFormation templates

To understand the root cause, this is because the Level 1 construct `CfnTable` maps directly to the CloudFormation resource `AWS::DynamoDB::Table` and you can only define the resource's properties when using the Level 1 construct. 

DynamoDB uses Application Autoscaling to automatically scale the table's capacity . 
Thus, you would need to use the `CfnScalableTarget` & `CfnScalingPolicy` constructs of application autoscaling resource to enable autoscaling on DynamoDB.

This sample repo shows implementation using AWS CDK Application Auto Scaling L1 construct library for a DynamoDb resource.

For more details, refer to the [Blog Post](https://vivek-aws.medium.com/scaling-dynamodb-capacity-using-aws-cdk-l1-construct-library-that-does-not-natively-support-cf3ace6d041d).


The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
