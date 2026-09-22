KLF_TestJasmineMatchers(global);

KLF_LdapGroupServiceTest(outputs, steps, params, stepResult, assertEqual);

jasmine.getEnv().execute();
