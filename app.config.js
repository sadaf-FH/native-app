export default ({ config }) => {
  const ENV = process.env.APP_ENV ?? "dev";

  const envs = {
    dev: {
      name: "MyApp Dev",
      slug: "myapp-dev",
      package: "com.anonymous.myapp.dev",
      bundleId: "com.anonymous.myapp.dev",
      apiUrl: "https://api.dev.example.com",
      icon: "./assets/images/icon-dev.png",
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon-dev.png",
        backgroundColor: "#E6F4FE",
      },
    },
    staging: {
      name: "MyApp Staging",
      slug: "myapp-staging", 
      package: "com.anonymous.myapp.staging",
      bundleId: "com.anonymous.myapp.staging",
      apiUrl: "https://api.example.com",
      icon: "./assets/images/icon-staging.png",
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon-staging.png",
        backgroundColor: "#E6F4FE",
      },
    },
  };

  const current = envs[ENV];

  return {
    ...config,

    name: current.name,
    slug: current.slug,
    icon: current.icon,

    extra: {
      ...config.extra,
      eas: {
        projectId: "412274b7-ac7b-47a8-a25e-8b4439172d29",
      },
      env: ENV,
      apiUrl: current.apiUrl,
    },

    ios: {
      ...config.ios,
      bundleIdentifier: current.bundleId,
    },

    android: {
      ...config.android,
      package: current.package,
      adaptiveIcon: current.adaptiveIcon, 
    },
  };
};
