/*
 * Migration-only registry for the original full course source files.
 * Never import this module from browser code.
 */

/* eslint-disable max-len */

import {cybersecurityFundamentals} from "../../data/cybersecurity-fundamentals.js";
import {networkingFundamentals} from "../../data/networking-fundamentals.js";
import {linuxFundamentals} from "../../data/linux-fundamentals.js";
import {windowsFundamentals} from "../../data/windows-fundamentals.js";
import {bashLinuxAutomation} from "../../data/bash-linux-automation.js";
import {pythonCybersecurityFundamentals} from "../../data/python-cybersecurity-fundamentals.js";
import {activeDirectoryFundamentals} from "../../data/active-directory-fundamentals.js";
import {ethicalHacking} from "../../data/ethical-hacking.js";
import {webApplicationSecurity} from "../../data/web-application-security.js";
import {pythonOffensiveSecurity} from "../../data/python-offensive-security.js";
import {activeDirectorySecurityPentesting} from "../../data/active-directory-security-pentesting.js";
import {linuxPrivilegeEscalation} from "../../data/linux-privilege-escalation.js";
import {practicalPenetrationTesting} from "../../data/practical-penetration-testing.js";

export const fullCourses = Object.fromEntries([
  cybersecurityFundamentals,
  networkingFundamentals,
  linuxFundamentals,
  windowsFundamentals,
  bashLinuxAutomation,
  pythonCybersecurityFundamentals,
  activeDirectoryFundamentals,
  ethicalHacking,
  webApplicationSecurity,
  pythonOffensiveSecurity,
  activeDirectorySecurityPentesting,
  linuxPrivilegeEscalation,
  practicalPenetrationTesting,
].map((course) => [course.id, course]));
