/* eslint-disable unicorn/filename-case */
import * as chai from 'chai'

import chaiAsPromised from 'chai-as-promised'

// Use chai-as-promised to test promises
chai.use(chaiAsPromised)

// Re-export chai's assert, expect, and should
global.assert = chai.assert
global.expect = chai.expect
global.should = chai.should()
