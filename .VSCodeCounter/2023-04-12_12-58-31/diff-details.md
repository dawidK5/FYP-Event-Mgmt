# Diff Details

Date : 2023-04-12 12:58:31

Directory c:\\Users\\admin\\vscodeprojects\\FYP\\Z12v0events\\projectv1\\z12event

Total : 57 files,  19723 codes, 199 comments, 370 blanks, all 20292 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [README.md](/README.md) | Markdown | 1 | 0 | 0 | 1 |
| [Z12v0events.code-workspace](/Z12v0events.code-workspace) | JSON with Comments | 8 | 0 | 0 | 8 |
| [api/__init__.py](/api/__init__.py) | Python | 0 | 0 | 1 | 1 |
| [api/apps.py](/api/apps.py) | Python | 4 | 0 | 3 | 7 |
| [api/auth/views.py](/api/auth/views.py) | Python | 49 | 0 | 28 | 77 |
| [api/clubs/views.py](/api/clubs/views.py) | Python | 10 | 0 | 3 | 13 |
| [api/events/serializers.py](/api/events/serializers.py) | Python | 40 | 0 | 13 | 53 |
| [api/events/views.py](/api/events/views.py) | Python | 57 | 2 | 10 | 69 |
| [api/tests.py](/api/tests.py) | Python | 30 | 0 | 5 | 35 |
| [api/urls.py](/api/urls.py) | Python | 17 | 0 | 2 | 19 |
| [api/users/serializers.py](/api/users/serializers.py) | Python | 15 | 6 | 6 | 27 |
| [api/users/views.py](/api/users/views.py) | Python | 27 | 5 | 4 | 36 |
| [event_mgmt/admin.py](/event_mgmt/admin.py) | Python | -4 | 4 | 0 | 0 |
| [event_mgmt/apps.py](/event_mgmt/apps.py) | Python | 0 | 0 | 1 | 1 |
| [event_mgmt/constants.json](/event_mgmt/constants.json) | JSON | 5 | 0 | 0 | 5 |
| [event_mgmt/models.py](/event_mgmt/models.py) | Python | 13 | -9 | -2 | 2 |
| [event_mgmt/tests.py](/event_mgmt/tests.py) | Python | 27 | -1 | 4 | 30 |
| [event_mgmt/urls.py](/event_mgmt/urls.py) | Python | -5 | 5 | 0 | 0 |
| [manage.py](/manage.py) | Python | 15 | 3 | 5 | 23 |
| [z12event/__init__.py](/z12event/__init__.py) | Python | 0 | 0 | 1 | 1 |
| [z12event/asgi.py](/z12event/asgi.py) | Python | 4 | 8 | 5 | 17 |
| [z12event/settings.py](/z12event/settings.py) | Python | 108 | 75 | 43 | 226 |
| [z12event/urls.py](/z12event/urls.py) | Python | 9 | 15 | 2 | 26 |
| [z12event/wsgi.py](/z12event/wsgi.py) | Python | 4 | 8 | 5 | 17 |
| [z12eventui/README.md](/z12eventui/README.md) | Markdown | 38 | 0 | 33 | 71 |
| [z12eventui/build/asset-manifest.json](/z12eventui/build/asset-manifest.json) | JSON | 16 | 0 | 0 | 16 |
| [z12eventui/build/index.html](/z12eventui/build/index.html) | HTML | 1 | 0 | 0 | 1 |
| [z12eventui/build/manifest.json](/z12eventui/build/manifest.json) | JSON | 25 | 0 | 1 | 26 |
| [z12eventui/build/static/css/main.073c9b0a.css](/z12eventui/build/static/css/main.073c9b0a.css) | CSS | 1 | 1 | 0 | 2 |
| [z12eventui/build/static/js/787.0a2c6d4e.chunk.js](/z12eventui/build/static/js/787.0a2c6d4e.chunk.js) | JavaScript | 1 | 1 | 0 | 2 |
| [z12eventui/build/static/js/main.67b8e7df.js](/z12eventui/build/static/js/main.67b8e7df.js) | JavaScript | 1 | 2 | 0 | 3 |
| [z12eventui/build/static/media/logo.6ce24c58023cc2f8fd88fe9d219db6c6.svg](/z12eventui/build/static/media/logo.6ce24c58023cc2f8fd88fe9d219db6c6.svg) | XML | 1 | 0 | 0 | 1 |
| [z12eventui/package-lock.json](/z12eventui/package-lock.json) | JSON | 17,328 | 0 | 1 | 17,329 |
| [z12eventui/package.json](/z12eventui/package.json) | JSON | 54 | 0 | 1 | 55 |
| [z12eventui/public/index.html](/z12eventui/public/index.html) | HTML | 20 | 23 | 1 | 44 |
| [z12eventui/public/manifest.json](/z12eventui/public/manifest.json) | JSON | 25 | 0 | 1 | 26 |
| [z12eventui/src/App.css](/z12eventui/src/App.css) | CSS | 33 | 0 | 6 | 39 |
| [z12eventui/src/App.js](/z12eventui/src/App.js) | JavaScript | 9 | 1 | 3 | 13 |
| [z12eventui/src/App.test.js](/z12eventui/src/App.test.js) | JavaScript | 35 | 0 | 4 | 39 |
| [z12eventui/src/components/Events.js](/z12eventui/src/components/Events.js) | JavaScript | 296 | 1 | 47 | 344 |
| [z12eventui/src/components/Home.js](/z12eventui/src/components/Home.js) | JavaScript | 56 | 6 | 14 | 76 |
| [z12eventui/src/components/Registration.js](/z12eventui/src/components/Registration.js) | JavaScript | 70 | 0 | 5 | 75 |
| [z12eventui/src/data/constants.js](/z12eventui/src/data/constants.js) | JavaScript | 212 | 1 | 1 | 214 |
| [z12eventui/src/data/setup.json](/z12eventui/src/data/setup.json) | JSON | 262 | 0 | 0 | 262 |
| [z12eventui/src/data_model.json](/z12eventui/src/data_model.json) | JSON | 190 | 7 | 21 | 218 |
| [z12eventui/src/index.css](/z12eventui/src/index.css) | CSS | 12 | 0 | 2 | 14 |
| [z12eventui/src/index.js](/z12eventui/src/index.js) | JavaScript | 52 | 31 | 7 | 90 |
| [z12eventui/src/logo.svg](/z12eventui/src/logo.svg) | XML | 1 | 0 | 0 | 1 |
| [z12eventui/src/pages/About.js](/z12eventui/src/pages/About.js) | JavaScript | 50 | 0 | 4 | 54 |
| [z12eventui/src/pages/Events.js](/z12eventui/src/pages/Events.js) | JavaScript | 236 | 0 | 30 | 266 |
| [z12eventui/src/pages/Home.js](/z12eventui/src/pages/Home.js) | JavaScript | 31 | 0 | 9 | 40 |
| [z12eventui/src/pages/Login.js](/z12eventui/src/pages/Login.js) | JavaScript | 68 | 0 | 14 | 82 |
| [z12eventui/src/pages/Register.js](/z12eventui/src/pages/Register.js) | JavaScript | 105 | 0 | 18 | 123 |
| [z12eventui/src/reportWebVitals.js](/z12eventui/src/reportWebVitals.js) | JavaScript | 12 | 0 | 2 | 14 |
| [z12eventui/src/setupTests.js](/z12eventui/src/setupTests.js) | JavaScript | 1 | 4 | 1 | 6 |
| [z12eventui/src/styles/theme/index.js](/z12eventui/src/styles/theme/index.js) | JavaScript | 13 | 0 | 2 | 15 |
| [z12eventui/src/utils/api.js](/z12eventui/src/utils/api.js) | JavaScript | 34 | 0 | 3 | 37 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details