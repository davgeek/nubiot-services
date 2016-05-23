FROM nginx:latest

RUN apt-get update \
	&& apt-get install -y unzip

ADD files/start.sh /bin/start.sh
RUN chmod +x /bin/start.sh
ADD files/default.ctmpl /templates/default.ctmpl

ADD files/nubiot.com.crt /ssl/nubiot.com.crt
ADD files/nubiot.com.key /ssl/nubiot.com.key
ADD files/landing/	/landing/

ADD https://releases.hashicorp.com/consul-template/0.12.2/consul-template_0.12.2_linux_amd64.zip /usr/bin/
RUN unzip /usr/bin/consul-template_0.12.2_linux_amd64.zip -d /usr/local/bin

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["/bin/start.sh"]