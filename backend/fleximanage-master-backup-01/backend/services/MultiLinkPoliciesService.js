// flexiWAN SD-WAN software - flexiEdge, flexiManage.
// For more information go to https://flexiwan.com
// Copyright (C) 2019-2020  flexiWAN Ltd.

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
/* eslint-disable no-unused-vars */
const Service = require('./Service');
const createError = require('http-errors');
const isEqual = require('lodash/isEqual');
const { getAccessTokenOrgList } = require('../utils/membershipUtils');
const MultiLinkPolicies = require('../models/mlpolicies');
const { devices } = require('../models/devices');
const { ObjectId } = require('mongoose').Types;

const emptyPrefix = {
  ip: '',
  ports: '',
  protocol: ''
};

const emptyApp = {
  appId: '',
  category: '',
  serviceClass: '',
  importance: ''
};

class MultiLinkPoliciesService {
  static verifyRequestSchema (rules) {
    for (const rule of rules) {
      // At least application or prefix
      // should exist in the request
      const { application, prefix } = rule.classification;
      if (
        (!application && !prefix) ||
        (application && prefix)
      ) return false;

      // Empty prefix is not allowed
      if (prefix && isEqual(prefix, emptyPrefix)) return false;

      // Empty application is not allowed
      if (application && isEqual(application, emptyApp)) return false;
    }
    return true;
  }

  /**
   * Get all Multi Link policies
   *
   * offset Integer The number of items to skip before starting to collect the result set (optional)
   * limit Integer The numbers of items to return (optional)
   * org String Organization to be filtered by (optional)
   * returns List
   **/
  static async mlpoliciesGET ({ offset, limit, org }, { user }) {
    try {
      const orgList = await getAccessTokenOrgList(user, org, false);
      const mlPolicies = await MultiLinkPolicies.find(
        { org: { $in: orgList } },
        {
          name: 1,
          description: 1,
          rules: 1,
          'rules.name': 1,
          'rules.enabled': 1,
          'rules.priority': 1,
          'rules._id': 1,
          'rules.classification': 1,
          'rules.action': 1
        }
      )
        .lean()
        .skip(offset)
        .limit(limit)
        .populate(
          'rules.action.links.pathlabels',
          '_id name description color type'
        );

      const converted = JSON.parse(JSON.stringify(mlPolicies));
      return Service.successResponse(converted);
    } catch (e) {
      return Service.rejectResponse(
        e.message || 'Internal Server Error',
        e.status || 500
      );
    }
  }

  /**
   * Delete a Multi Link policy
   *
   * id String Numeric ID of the Multi Link policy to delete
   * no response value expected for this operation
   **/
  static async mlpoliciesIdDELETE ({ id, org }, { user }) {
    try {
      const orgList = await getAccessTokenOrgList(user, org, true);

      // Don't allow deleting a policy if it's
      // installed on at least one device
      const count = await devices.countDocuments({
        'policies.multilink.policy': id,
        org: { $in: orgList }
      });

      if (count > 0) {
        const message = 'Cannot delete a policy that is being used';
        return Service.rejectResponse(message, 400);
      }

      const { deletedCount } = await MultiLinkPolicies.deleteOne({
        org: { $in: orgList },
        _id: id
      });

      if (deletedCount === 0) {
        return Service.rejectResponse('Not found', 404);
      }

      return Service.successResponse({}, 204);
    } catch (e) {
      return Service.rejectResponse(
        e.message || 'Internal Server Error',
        e.status || 500
      );
    }
  }

  /**
   * Get a Multi Link policy by id
   *
   * id String Numeric ID of the Multi Link policy to retrieve
   * org String Organization to be filtered by (optional)
   * returns MLPolicy
   **/
  static async mlpoliciesIdGET ({ id, org }, { user }) {
    try {
      const orgList = await getAccessTokenOrgList(user, org, false);
      const MLPolicy = await MultiLinkPolicies.findOne(
        {
          org: { $in: orgList },
          _id: id
        },
        {
          name: 1,
          description: 1,
          rules: 1,
          'rules.name': 1,
          'rules.enabled': 1,
          'rules.priority': 1,
          'rules._id': 1,
          'rules.classification': 1,
          'rules.action': 1
        }
      )
        .lean()
        .populate(
          'rules.action.links.pathlabels',
          '_id name description color type'
        );

      if (!MLPolicy) {
        return Service.rejectResponse('Not found', 404);
      }

      const converted = JSON.parse(JSON.stringify(MLPolicy));
      return Service.successResponse(converted);
    } catch (e) {
      return Service.rejectResponse(
        e.message || 'Internal Server Error',
        e.status || 500
      );
    }
  }

  /**
   * Modify a Multi Link policy
   *
   * id String Numeric ID of the Multi Link policy to modify
   * mLPolicyRequest MLPolicyRequest  (optional)
   * returns MLPolicy
   **/
  static async mlpoliciesIdPUT ({ id, org, mLPolicyRequest }, { user }) {
    try {
      const { name, description, rules } = mLPolicyRequest;
      const orgList = await getAccessTokenOrgList(user, org, true);

      // Verify request schema
      if (!MultiLinkPoliciesService.verifyRequestSchema(rules)) {
        throw createError(400, 'Invalid policy schema');
      }

      const MLPolicy = await MultiLinkPolicies.findOneAndUpdate(
        {
          org: { $in: orgList },
          _id: id
        },
        {
          org: user.defaultOrg._id.toString(),
          name: name,
          description: description,
          rules: rules
        },
        {
          fields: {
            name: 1,
            description: 1,
            rules: 1,
            'rules.name': 1,
            'rules.enabled': 1,
            'rules.priority': 1,
            'rules._id': 1,
            'rules.classification': 1,
            'rules.action': 1
          },
          new: true
        }
      )
        .lean()
        .populate(
          'rules.action.links.pathlabels',
          '_id name description color type'
        );

      if (!MLPolicy) {
        return Service.rejectResponse('Not found', 404);
      }

      const converted = JSON.parse(JSON.stringify(MLPolicy));
      return Service.successResponse(converted);
    } catch (e) {
      return Service.rejectResponse(
        e.message || 'Internal Server Error',
        e.status || 500
      );
    }
  }

  /**
   * Get all Multi Link policies names and IDs only
   *
   * offset Integer The number of items to skip before starting to collect the result set (optional)
   * limit Integer The numbers of items to return (optional)
   * org String Organization to be filtered by (optional)
   * returns List
   **/
  static async mlpoliciesListGET ({ offset, limit, org }, { user }) {
    try {
      const orgList = await getAccessTokenOrgList(user, org, false);
      const mlPolicies = await MultiLinkPolicies.find(
        { org: { $in: orgList } },
        { name: 1 }
      )
        .skip(offset)
        .limit(limit);

      return Service.successResponse(mlPolicies);
    } catch (e) {
      return Service.rejectResponse(
        e.message || 'Internal Server Error',
        e.status || 500
      );
    }
  }

  /**
   * Add a new Multi Link policy
   *
   * mLPolicyRequest MLPolicyRequest
   * org String Organization to be filtered by (optional)
   * returns MLPolicy
   **/
  static async mlpoliciesPOST ({ mLPolicyRequest, org }, { user }) {
    try {
      const { name, description, rules } = mLPolicyRequest;
      const orgList = await getAccessTokenOrgList(user, org, true);

      // Verify request schema
      if (!MultiLinkPoliciesService.verifyRequestSchema(rules)) {
        throw createError(400, 'Invalid policy schema');
      }

      let result = await MultiLinkPolicies.create({
        org: orgList[0].toString(),
        name: name,
        description: description,
        rules: rules
      });

      result = await result.populate(
        'rules.action.links.pathlabels',
        '_id name description color type'
      ).execPopulate();

      const MLPolicy = (({ _id, name, description, rules }) => ({
        _id,
        name,
        description,
        rules
      }))(result);

      MLPolicy.rules = MLPolicy.rules.map(rule => {
        return ({
          _id: rule._id,
          name: rule.name,
          enabled: rule.enabled,
          priority: rule.priority,
          classification: rule.classification,
          action: rule.action
        });
      });

      const converted = JSON.parse(JSON.stringify(MLPolicy));
      return Service.successResponse(converted, 201);
    } catch (e) {
      return Service.rejectResponse(
        e.message || 'Internal Server Error',
        e.status || 500
      );
    }
  }

  /**
   * Get all multi link policies metadata
   *
   * offset Integer The number of items to skip before
   * starting to collect the result set (optional)
   * limit Integer The numbers of items to return (optional)
   * org String Organization to be filtered by (optional)
   * returns List
   **/
  static async mlpoliciesMetaGET ({ offset, limit, org }, { user }) {
    try {
      const orgList = await getAccessTokenOrgList(user, org, false);

      // Fetch al multi link policies of the organization.
      // To each policy, attach the installation status of
      // each of the devices the policy is installed on.
      const mlPoliciesMeta = await MultiLinkPolicies.aggregate([
        { $match: { org: { $in: orgList.map(org => ObjectId(org)) } } },
        {
          $project: {
            _id: 1,
            name: 1,
            description: 1
          }
        },
        {
          $lookup: {
            from: 'devices',
            let: { id: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$policies.multilink.policy', '$$id'] } } },
              { $project: { 'policies.multilink': 1 } }
            ],
            as: 'mlpolicy'
          }
        },
        { $addFields: { statuses: '$mlpolicy.policies.multilink.status' } },
        {
          $project: {
            _id: { $toString: '$_id' },
            name: 1,
            description: 1,
            statuses: 1
          }
        }
      ]).allowDiskUse(true);

      const response = mlPoliciesMeta.map(policy => {
        const installCount = {
          installed: 0,
          pending: 0,
          failed: 0,
          deleted: 0
        };
        policy.statuses.forEach(policyStatus => {
          if (policyStatus === 'installed') {
            installCount.installed++;
          } else if (['installing', 'uninstalling'].includes(policyStatus)) {
            installCount.pending++;
          } else if (policyStatus.includes('fail')) {
            installCount.failed++;
          } else if (policyStatus.includes('deleted')) {
            installCount.deleted++;
          }
        });
        const { statuses, ...rest } = policy;
        return {
          ...rest,
          installCount
        };
      });
      return Service.successResponse(response);
    } catch (e) {
      return Service.rejectResponse(
        e.message || 'Internal Server Error',
        e.status || 500
      );
    }
  }
}

module.exports = MultiLinkPoliciesService;
