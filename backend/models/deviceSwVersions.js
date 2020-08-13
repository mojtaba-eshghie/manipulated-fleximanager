// flexiWAN SD-WAN software - flexiEdge, flexiManage.
// For more information go to https://flexiwan.com
// Copyright (C) 2019  flexiWAN Ltd.

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

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoConns = require('../mongoConns.js')();

/**
 * Device Software Version Database Schema
 *
 * A schema for the documents that stores device latest software version
 */
const deviceSwVersionSchema = new Schema({
  // device version
  versions: {
    type: Object,
    required: true
  },
  // version support end
  versionDeadline: {
    type: Date,
    required: true,
    default: Date.now
  }

}, {
  timestamps: true
});

// Default exports
module.exports = mongoConns.getMainDB().model('deviceSwVersion', deviceSwVersionSchema);
