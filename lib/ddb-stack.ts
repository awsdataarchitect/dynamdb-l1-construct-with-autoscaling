import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as autoscaling from 'aws-cdk-lib/aws-applicationautoscaling';

export interface DdbStackProps extends cdk.StackProps {
}

export class DdbStack extends cdk.Stack {
  public constructor(scope: cdk.App, id: string, props: DdbStackProps = {}) {
    super(scope, id, props);

    // Resources
    const dynamoDbTable00test00nMgNz = new dynamodb.CfnTable(this, 'DynamoDBTable00test00nMGNz', {
      sseSpecification: {
        sseEnabled: false,
      },
      tableName: 'test',
      attributeDefinitions: [
        {
          attributeType: 'S',
          attributeName: 'test',
        },
      ],
      contributorInsightsSpecification: {
        enabled: false,
      },
      billingMode: 'PROVISIONED',
      pointInTimeRecoverySpecification: {
        pointInTimeRecoveryEnabled: false,
      },
      provisionedThroughput: {
        writeCapacityUnits: 1,
        readCapacityUnits: 1,
      },
      keySchema: [
        {
          keyType: 'HASH',
          attributeName: 'test',
        },
      ],
      deletionProtectionEnabled: false,
      tableClass: 'STANDARD',
      tags: [
      ],
      timeToLiveSpecification: {
        enabled: false,
      },
    });
   


// Enable auto-scaling for the write capacity of the table
const writeScalingTarget = new autoscaling.CfnScalableTarget(this, 'DynamoDbTableWriteScalingTarget', {
  maxCapacity: 10, // Set the maximum capacity to scale up to
  minCapacity: 1, // Set the minimum capacity to ensure at least one capacity unit is provisioned
  resourceId: `table/${dynamoDbTable00test00nMgNz.ref}`, // Specify the resource ID of the DynamoDB table
  scalableDimension: 'dynamodb:table:WriteCapacityUnits', // Define the scalable dimension for write capacity
  serviceNamespace: 'dynamodb', // Set the service namespace to DynamoDB
});

// Set the target utilization percentage for the write capacity
const writeScalingPolicy = new autoscaling.CfnScalingPolicy(this, 'DynamoDbTableWriteScalingPolicy', {
  policyName: 'DynamoDbTableWriteScalingPolicy', // Specify the name of the scaling policy
  policyType: 'TargetTrackingScaling', // Define the type of scaling policy as target tracking
  scalingTargetId: writeScalingTarget.ref, // Reference the scalable target ID
  targetTrackingScalingPolicyConfiguration: {
  predefinedMetricSpecification: {
  predefinedMetricType: 'DynamoDBWriteCapacityUtilization', // Specify the predefined metric type for DynamoDB write capacity utilization
  },
  targetValue: 50, // Set the target value for write capacity utilization
  },
});


    dynamoDbTable00test00nMgNz.cfnOptions.deletionPolicy = cdk.CfnDeletionPolicy.RETAIN;
  }


}
