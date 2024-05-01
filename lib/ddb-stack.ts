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
  maxCapacity: 10,
  minCapacity: 1,
  resourceId: `table/${dynamoDbTable00test00nMgNz.ref}`,
  scalableDimension: 'dynamodb:table:WriteCapacityUnits',
  serviceNamespace: 'dynamodb',
});

// Set the target utilization percentage for the write capacity
const writeScalingPolicy = new autoscaling.CfnScalingPolicy(this, 'DynamoDbTableWriteScalingPolicy', {
  policyName: 'DynamoDbTableWriteScalingPolicy',
  policyType: 'TargetTrackingScaling',
  scalingTargetId: writeScalingTarget.ref,
  targetTrackingScalingPolicyConfiguration: {
    predefinedMetricSpecification: {
      predefinedMetricType: 'DynamoDBWriteCapacityUtilization',
    },
    targetValue: 50,
  },
});

    dynamoDbTable00test00nMgNz.cfnOptions.deletionPolicy = cdk.CfnDeletionPolicy.RETAIN;
  }


}
