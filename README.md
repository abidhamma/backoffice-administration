
MAGOWARE is an IPTV/OTT solution for Pay Tv Businesses. The administration portal is build on Sequelize, Express, ng-admin, and Node.js

### Installation Step By Step

### Before you start, make sure you have these prerequisites installed:

 * Node.js
 * NPM

### Follow these steps to install Magoware  Management System
## Proceed by
```
sudo apt-get update
sudo apt-get upgarde -y
sudo apt-get install git -y
```

You can determine the CPU architecture of your server with these commands:
```
sudo getconf LONG_BIT
sudo uname -p
```

The latter is shown below (Note: the specific Node.js version might be different for you) in this case i use 10.16.3:
Download and install NODE JS from the following link:

https://nodejs.org/en/download/

```
sudo wget https://nodejs.org/dist/v10.16.3/node-v10.16.3-linux-x64.tar.xz
sudo apt-get install xz-utils
tar -C /usr --strip-components 1 -xJf node-v10.16.3-linux-x64.tar.xz
ls -l /usr/bin/node
ls -l /usr/bin/npm
```

Install MySQL Server
```
sudo apt-get install mysql-server
```
# Follow instruction during mysql server installation.

### Install NPM Package
```
npm install --save sequelize
npm install --save mysql2
```

We recommend versions 7.x.x or 8.x.x installed for nodejs

### Download MAGOWARE Backoffice application from Github
```
sudo git clone https://github.com/MAGOWARE/backoffice-administration.git
```
Then
```
cd backoffice-administration
```

Run the following command within the root folder to install application libriaries:
```
sudo npm install (in linux)
npm install (in windows)
```

### Create a database on MySQL server.
```
mysql -u root -p
GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' IDENTIFIED BY 'password';
```
To create a database user, type the following command. Replace username with the user you want to create, and replace password with the user's password then continue to create database for magoware

```
CREATE DATABASE dbname;
exit;
```
Change dbname to your desire database name

Make sure that the collation and charset of your schema supports the languages that you intend to use.

After all libraries are installed, run the following command to start the server:
```
sudo node server.js (in linux)
node server.js (in windows)
```
When application runs for the first time, it will automatically create database structures and populate necessary tables with default values.


### Database migration
If this is an upgrade, please run the following to upgrade the database with the latest changes:

```bash
$ sequelize db:migrate
```

Login to start creating accounts and assets

go to: 
## http://YourDomain_or_IP/admin 
and login with username admin and password admin

## Screenshots

![login 1](https://user-images.githubusercontent.com/27496920/35095606-51949b68-fc49-11e7-8b16-7be2c8ab11ae.png)
![dashboard](https://user-images.githubusercontent.com/27496920/35095565-2cd728c2-fc49-11e7-8611-b84f989968a6.png)
![ga_events-1024x489](https://user-images.githubusercontent.com/27496920/35095647-848ebca6-fc49-11e7-96ae-053a86a5f5fd.png)

## Player Application

You can download the player here: \
https://github.com/MAGOWARE/backoffice-administration/blob/master/android_apk/magoware-2.8.15.apk

---

## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
