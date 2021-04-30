FROM registry.access.redhat.com/ubi8/nodejs-14 as base

# Install yarn
RUN npm install -g yarn

# Copy project files into the docker image
COPY . .

# Chown to correct user
USER 0
RUN chown -R 1001:0 ${APP_ROOT} && chmod -R ug+rwx ${APP_ROOT} && \
    rpm-file-permissions

RUN npm install --unsafe-perm
EXPOSE 6006

CMD npm run storybook --unsafe-perm


