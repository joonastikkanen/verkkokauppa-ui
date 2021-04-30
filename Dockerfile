FROM registry.access.redhat.com/ubi8/nodejs-14 as base

# Install yarn
RUN npm install -g yarn

# Copy project files into the docker image
COPY . .

WORKDIR /opt/app-root/src/


RUN npm install --unsafe-perm
EXPOSE 6006
CMD npm run storybook --unsafe-perm


