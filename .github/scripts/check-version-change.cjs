#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

/**
 * Check if package.json version has changed in the current commit
 * Sets GitHub Action outputs using the new GITHUB_OUTPUT environment file method
 */
function checkVersionChange() {
  try {
    console.log('Checking if package.json version has changed...');
    
    const packageJsonPath = 'package.json';
    
    // Check if package.json exists
    if (!fs.existsSync(packageJsonPath)) {
      console.log('package.json not found');
      setOutput('has-updated', 'false');
      setOutput('version', '');
      setOutput('previous-version', '');
      return;
    }

    // Get the current package.json content
    const currentPackageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const currentVersion = currentPackageJson.version;
    
    console.log(`Current version: ${currentVersion}`);

    // Try to get the previous version from git
    let previousVersion = '';
    let hasChanged = false;

    try {
      // Get the package.json content from the previous commit (HEAD~1)
      const previousPackageJsonContent = execSync('git show HEAD~1:package.json', { 
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe']
      });
      
      const previousPackageJson = JSON.parse(previousPackageJsonContent);
      previousVersion = previousPackageJson.version;
      
      console.log(`Previous version: ${previousVersion}`);
      
      // Compare versions
      hasChanged = currentVersion !== previousVersion;
      
    } catch (gitError) {
      console.log('Could not get previous version from git (possibly first commit or no previous commits)');
      console.log('Git error:', gitError.message);
      
      // If we can't get previous version, assume this is a new repo or first commit
      // In this case, we'll consider it as "changed" if there's a version
      hasChanged = currentVersion ? true : false;
      previousVersion = '';
    }

    console.log(`Version changed: ${hasChanged}`);
    
    // Set outputs using the new GITHUB_OUTPUT environment file method
    setOutput('has-updated', hasChanged.toString());
    setOutput('version', currentVersion || '');
    setOutput('previous-version', previousVersion);
    
    // Also log for debugging
    console.log(`Outputs set:`);
    console.log(`  has-updated: ${hasChanged}`);
    console.log(`  version: ${currentVersion || ''}`);
    console.log(`  previous-version: ${previousVersion}`);

  } catch (error) {
    console.error('Error checking version change:', error);
    // On error, set safe defaults
    setOutput('has-updated', 'false');
    setOutput('version', '');
    setOutput('previous-version', '');
    process.exit(1);
  }
}

/**
 * Set GitHub Action output using the new environment file method
 * @param {string} name - Output name
 * @param {string} value - Output value
 */
function setOutput(name, value) {
  const githubOutput = process.env.GITHUB_OUTPUT;
  if (githubOutput) {
    fs.appendFileSync(githubOutput, `${name}=${value}\n`);
  } else {
    console.log(`Would set output: ${name}=${value}`);
  }
}

// Run the check
checkVersionChange(); 