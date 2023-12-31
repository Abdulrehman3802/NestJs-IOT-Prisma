PGDMP                      	    {            IOT_Test    14.9    15.3 �    
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    17036    IOT_Test    DATABASE     �   CREATE DATABASE "IOT_Test" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "IOT_Test";
                postgres    false                        2615    17037    IoT    SCHEMA        CREATE SCHEMA "IoT";
    DROP SCHEMA "IoT";
                postgres    false            �            1259    17038    alertnotifications    TABLE       CREATE TABLE "IoT".alertnotifications (
    notificationid integer NOT NULL,
    staffid integer NOT NULL,
    deviceid integer NOT NULL,
    thresholdminvalue double precision NOT NULL,
    thresholdmaxvalue double precision NOT NULL,
    notificationtime time without time zone NOT NULL,
    lastacknowledgmenttime timestamp with time zone,
    escalationlevel integer NOT NULL
);
 %   DROP TABLE "IoT".alertnotifications;
       IoT         heap    postgres    false    5            �            1259    17041 %   alertnotifications_notificationid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".alertnotifications_notificationid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE "IoT".alertnotifications_notificationid_seq;
       IoT          postgres    false    5    210                       0    0 %   alertnotifications_notificationid_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE "IoT".alertnotifications_notificationid_seq OWNED BY "IoT".alertnotifications.notificationid;
          IoT          postgres    false    211            �            1259    17569    alerts_alertid_seq    SEQUENCE     z   CREATE SEQUENCE "IoT".alerts_alertid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE "IoT".alerts_alertid_seq;
       IoT          postgres    false    5            �            1259    17570    alerts    TABLE     m  CREATE TABLE "IoT".alerts (
    alertid integer DEFAULT nextval('"IoT".alerts_alertid_seq'::regclass) NOT NULL,
    sensorid integer NOT NULL,
    alerttype character varying(50) NOT NULL,
    readingvalue numeric(10,2) NOT NULL,
    "timestamp" timestamp without time zone,
    acknowledgedby integer,
    escalatedto integer,
    isgatewayfailurealert boolean
);
    DROP TABLE "IoT".alerts;
       IoT         heap    postgres    false    246    5            �            1259    17613    alertstatus_alertid_seq    SEQUENCE        CREATE SEQUENCE "IoT".alertstatus_alertid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE "IoT".alertstatus_alertid_seq;
       IoT          postgres    false    5            �            1259    17614    alertstatus    TABLE     �   CREATE TABLE "IoT".alertstatus (
    alertid integer DEFAULT nextval('"IoT".alertstatus_alertid_seq'::regclass) NOT NULL,
    status character varying(50),
    statustimestamp timestamp without time zone
);
    DROP TABLE "IoT".alertstatus;
       IoT         heap    postgres    false    250    5            �            1259    17048 	   customers    TABLE     W  CREATE TABLE "IoT".customers (
    customerid integer NOT NULL,
    customername character varying(100) NOT NULL,
    contactperson character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phone character varying(20) NOT NULL,
    address character varying(100) NOT NULL,
    city character varying(100) NOT NULL,
    is_active boolean DEFAULT true,
    date_created timestamp without time zone DEFAULT now(),
    date_updated timestamp without time zone DEFAULT now(),
    is_deleted boolean DEFAULT false,
    created_by integer NOT NULL,
    updated_by integer NOT NULL
);
    DROP TABLE "IoT".customers;
       IoT         heap    postgres    false    5            �            1259    17054    customers_customerid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".customers_customerid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE "IoT".customers_customerid_seq;
       IoT          postgres    false    212    5                       0    0    customers_customerid_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE "IoT".customers_customerid_seq OWNED BY "IoT".customers.customerid;
          IoT          postgres    false    213            �            1259    17055    departments    TABLE     �  CREATE TABLE "IoT".departments (
    departmentid integer NOT NULL,
    departmentname character varying(100) NOT NULL,
    customerid integer NOT NULL,
    location character varying(255),
    is_active boolean DEFAULT true,
    date_created timestamp without time zone DEFAULT now() NOT NULL,
    date_updated timestamp without time zone DEFAULT now(),
    is_deleted boolean DEFAULT false,
    facilityid integer NOT NULL,
    created_by integer NOT NULL,
    updated_by integer NOT NULL
);
    DROP TABLE "IoT".departments;
       IoT         heap    postgres    false    5            �            1259    17059    departments_departmentid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".departments_departmentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE "IoT".departments_departmentid_seq;
       IoT          postgres    false    214    5                       0    0    departments_departmentid_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE "IoT".departments_departmentid_seq OWNED BY "IoT".departments.departmentid;
          IoT          postgres    false    215            �            1259    17060    devices    TABLE     /  CREATE TABLE "IoT".devices (
    deviceid integer NOT NULL,
    devicename character varying(100) NOT NULL,
    departmentid integer NOT NULL,
    devicetype character varying(50),
    manufacturer character varying(100),
    is_active boolean DEFAULT true,
    date_created timestamp without time zone DEFAULT now() NOT NULL,
    date_updated timestamp without time zone DEFAULT now(),
    is_deleted boolean DEFAULT false,
    facilityid integer NOT NULL,
    customerid integer NOT NULL,
    created_by integer NOT NULL,
    updated_by integer NOT NULL
);
    DROP TABLE "IoT".devices;
       IoT         heap    postgres    false    5            �            1259    17064    devices_deviceid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".devices_deviceid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE "IoT".devices_deviceid_seq;
       IoT          postgres    false    5    216                       0    0    devices_deviceid_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE "IoT".devices_deviceid_seq OWNED BY "IoT".devices.deviceid;
          IoT          postgres    false    217            �            1259    17065    escalationlevels    TABLE     �   CREATE TABLE "IoT".escalationlevels (
    levelid integer NOT NULL,
    levelname character varying(50),
    description text
);
 #   DROP TABLE "IoT".escalationlevels;
       IoT         heap    postgres    false    5            �            1259    17070    escalationlevels_levelid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".escalationlevels_levelid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE "IoT".escalationlevels_levelid_seq;
       IoT          postgres    false    218    5                       0    0    escalationlevels_levelid_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE "IoT".escalationlevels_levelid_seq OWNED BY "IoT".escalationlevels.levelid;
          IoT          postgres    false    219            �            1259    17591    escalationstatus_alertid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".escalationstatus_alertid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE "IoT".escalationstatus_alertid_seq;
       IoT          postgres    false    5            �            1259    17592    escalationstatus    TABLE     �   CREATE TABLE "IoT".escalationstatus (
    alertid integer DEFAULT nextval('"IoT".escalationstatus_alertid_seq'::regclass) NOT NULL,
    levelid integer,
    staffid integer,
    lastescalationtimestamp timestamp without time zone
);
 #   DROP TABLE "IoT".escalationstatus;
       IoT         heap    postgres    false    248    5            �            1259    17544    facilities_facilityid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".facilities_facilityid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE "IoT".facilities_facilityid_seq;
       IoT          postgres    false    5            �            1259    17545 
   facilities    TABLE     �  CREATE TABLE "IoT".facilities (
    facilityid integer DEFAULT nextval('"IoT".facilities_facilityid_seq'::regclass) NOT NULL,
    name character varying(255),
    location character varying(255),
    address character varying(255),
    contactname character varying(255),
    contactphonenumber character varying(255),
    email character varying(255),
    isfacilityadmin boolean,
    is_active boolean DEFAULT true,
    is_deleted boolean DEFAULT false,
    date_created timestamp with time zone DEFAULT now(),
    date_updated timestamp with time zone DEFAULT now(),
    customerid integer,
    created_by integer NOT NULL,
    updated_by integer NOT NULL
);
    DROP TABLE "IoT".facilities;
       IoT         heap    postgres    false    244    5            �            1259    17074    gatewayfailures    TABLE     �   CREATE TABLE "IoT".gatewayfailures (
    failureid integer NOT NULL,
    gatewayid integer,
    failuretimestamp timestamp without time zone,
    recoverytimestamp timestamp without time zone
);
 "   DROP TABLE "IoT".gatewayfailures;
       IoT         heap    postgres    false    5            �            1259    17077    gatewayfailures_failureid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".gatewayfailures_failureid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE "IoT".gatewayfailures_failureid_seq;
       IoT          postgres    false    220    5                       0    0    gatewayfailures_failureid_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE "IoT".gatewayfailures_failureid_seq OWNED BY "IoT".gatewayfailures.failureid;
          IoT          postgres    false    221            �            1259    17078    gateways    TABLE     �  CREATE TABLE "IoT".gateways (
    gatewayid integer NOT NULL,
    gatewayname character varying(100) NOT NULL,
    location character varying(255),
    customerid integer NOT NULL,
    is_active boolean DEFAULT true,
    date_created timestamp without time zone NOT NULL,
    date_updated timestamp without time zone,
    is_deleted boolean DEFAULT false,
    created_by integer NOT NULL,
    updated_by integer NOT NULL
);
    DROP TABLE "IoT".gateways;
       IoT         heap    postgres    false    5            �            1259    17082    gateways_gatewayid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".gateways_gatewayid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE "IoT".gateways_gatewayid_seq;
       IoT          postgres    false    222    5                       0    0    gateways_gatewayid_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE "IoT".gateways_gatewayid_seq OWNED BY "IoT".gateways.gatewayid;
          IoT          postgres    false    223            �            1259    17083    readings    TABLE     .  CREATE TABLE "IoT".readings (
    readingid integer NOT NULL,
    sensorid integer NOT NULL,
    deviceid integer NOT NULL,
    gatewayid integer NOT NULL,
    measure character varying(20) NOT NULL,
    sensorvalue double precision NOT NULL,
    reading_timestamp timestamp with time zone NOT NULL
);
    DROP TABLE "IoT".readings;
       IoT         heap    postgres    false    5            �            1259    17086    readings_readingid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".readings_readingid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE "IoT".readings_readingid_seq;
       IoT          postgres    false    5    224                       0    0    readings_readingid_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE "IoT".readings_readingid_seq OWNED BY "IoT".readings.readingid;
          IoT          postgres    false    225            �            1259    17530 $   rolepermissions_rolepermissionid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".rolepermissions_rolepermissionid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE "IoT".rolepermissions_rolepermissionid_seq;
       IoT          postgres    false    5            �            1259    17531    rolepermissions    TABLE       CREATE TABLE "IoT".rolepermissions (
    rolepermissionid integer DEFAULT nextval('"IoT".rolepermissions_rolepermissionid_seq'::regclass) NOT NULL,
    roleid integer,
    permissiontype character varying(255),
    permissionvalue character varying(255)
);
 "   DROP TABLE "IoT".rolepermissions;
       IoT         heap    postgres    false    242    5            �            1259    17472    roles_roleid_seq    SEQUENCE     x   CREATE SEQUENCE "IoT".roles_roleid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE "IoT".roles_roleid_seq;
       IoT          postgres    false    5            �            1259    17473    roles    TABLE       CREATE TABLE "IoT".roles (
    roleid integer DEFAULT nextval('"IoT".roles_roleid_seq'::regclass) NOT NULL,
    name character varying(255),
    normalizedname character varying(255),
    is_active boolean DEFAULT true,
    is_deleted boolean DEFAULT false
);
    DROP TABLE "IoT".roles;
       IoT         heap    postgres    false    234    5            �            1259    17090    sensors    TABLE     �  CREATE TABLE "IoT".sensors (
    sensorid integer NOT NULL,
    deviceid integer,
    is_active boolean DEFAULT true,
    customerid integer NOT NULL,
    is_deleted boolean DEFAULT false,
    aws_sensorid character varying(50) NOT NULL,
    date_created timestamp without time zone DEFAULT now(),
    date_updated timestamp without time zone DEFAULT now(),
    assigned_by integer NOT NULL
);
    DROP TABLE "IoT".sensors;
       IoT         heap    postgres    false    5            �            1259    17094    sensors_sensorid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".sensors_sensorid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE "IoT".sensors_sensorid_seq;
       IoT          postgres    false    226    5                       0    0    sensors_sensorid_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE "IoT".sensors_sensorid_seq OWNED BY "IoT".sensors.sensorid;
          IoT          postgres    false    227            �            1259    17514    sensorgatewayassignment    TABLE     �   CREATE TABLE "IoT".sensorgatewayassignment (
    sensorid integer DEFAULT nextval('"IoT".sensors_sensorid_seq'::regclass) NOT NULL,
    gatewayid integer NOT NULL
);
 *   DROP TABLE "IoT".sensorgatewayassignment;
       IoT         heap    postgres    false    227    5            �            1259    17513 $   sensorgatewayassignment_sensorid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".sensorgatewayassignment_sensorid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE "IoT".sensorgatewayassignment_sensorid_seq;
       IoT          postgres    false    5            �            1259    17095    sensortypes    TABLE       CREATE TABLE "IoT".sensortypes (
    sensortypeid integer NOT NULL,
    sensortypename character varying(255),
    measurementunit character varying(50),
    minvalue numeric(10,2),
    maxvalue numeric(10,2),
    sensorid integer NOT NULL,
    aws_sensorid character varying(50) NOT NULL,
    is_hidden boolean DEFAULT false,
    is_deleted boolean DEFAULT false,
    date_created timestamp without time zone DEFAULT now(),
    date_updated timestamp without time zone DEFAULT now(),
    updated_by integer NOT NULL
);
    DROP TABLE "IoT".sensortypes;
       IoT         heap    postgres    false    5            �            1259    17098    sensortypes_sensortypeid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".sensortypes_sensortypeid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE "IoT".sensortypes_sensortypeid_seq;
       IoT          postgres    false    228    5                       0    0    sensortypes_sensortypeid_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE "IoT".sensortypes_sensortypeid_seq OWNED BY "IoT".sensortypes.sensortypeid;
          IoT          postgres    false    229            �            1259    17099    staff    TABLE     �  CREATE TABLE "IoT".staff (
    staffid integer NOT NULL,
    deviceid integer,
    name character varying(100) NOT NULL,
    email character varying(100),
    phone character varying(20),
    pager character varying(20),
    departmentid integer NOT NULL,
    isdepartmenthead boolean DEFAULT false,
    is_active boolean DEFAULT true,
    notificationstarttime time without time zone,
    notificationendtime time without time zone,
    weekdaysonly boolean DEFAULT false,
    date_created timestamp without time zone DEFAULT now() NOT NULL,
    date_updated timestamp without time zone DEFAULT now(),
    created_by integer NOT NULL,
    updated_by integer NOT NULL,
    is_deleted boolean DEFAULT false
);
    DROP TABLE "IoT".staff;
       IoT         heap    postgres    false    5            �            1259    17105    staff_staffid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".staff_staffid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE "IoT".staff_staffid_seq;
       IoT          postgres    false    5    230                       0    0    staff_staffid_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE "IoT".staff_staffid_seq OWNED BY "IoT".staff.staffid;
          IoT          postgres    false    231            �            1259    17106    staffdeviceassignment    TABLE     {   CREATE TABLE "IoT".staffdeviceassignment (
    assignmentid integer NOT NULL,
    staffid integer,
    deviceid integer
);
 (   DROP TABLE "IoT".staffdeviceassignment;
       IoT         heap    postgres    false    5            �            1259    17109 &   staffdeviceassignment_assignmentid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".staffdeviceassignment_assignmentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE "IoT".staffdeviceassignment_assignmentid_seq;
       IoT          postgres    false    5    232                       0    0 &   staffdeviceassignment_assignmentid_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE "IoT".staffdeviceassignment_assignmentid_seq OWNED BY "IoT".staffdeviceassignment.assignmentid;
          IoT          postgres    false    233            �            1259    17496    userroles_userroleid_seq    SEQUENCE     �   CREATE SEQUENCE "IoT".userroles_userroleid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE "IoT".userroles_userroleid_seq;
       IoT          postgres    false    5            �            1259    17497 	   userroles    TABLE     �   CREATE TABLE "IoT".userroles (
    userroleid integer DEFAULT nextval('"IoT".userroles_userroleid_seq'::regclass) NOT NULL,
    roleid integer NOT NULL,
    userid integer NOT NULL
);
    DROP TABLE "IoT".userroles;
       IoT         heap    postgres    false    238    5            �            1259    17483    users_userid_seq    SEQUENCE     x   CREATE SEQUENCE "IoT".users_userid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE "IoT".users_userid_seq;
       IoT          postgres    false    5            �            1259    17484    users    TABLE     `  CREATE TABLE "IoT".users (
    userid integer DEFAULT nextval('"IoT".users_userid_seq'::regclass) NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    email character varying(255),
    address character varying(255),
    passwordhash character varying(255),
    phonenumber character varying(20),
    createdby integer,
    updatedby integer,
    is_active boolean DEFAULT true,
    is_deleted boolean DEFAULT false,
    date_created timestamp with time zone DEFAULT now(),
    date_updated timestamp with time zone DEFAULT now(),
    resettoken character varying(255)
);
    DROP TABLE "IoT".users;
       IoT         heap    postgres    false    236    5            �           2604    17764 !   alertnotifications notificationid    DEFAULT     �   ALTER TABLE ONLY "IoT".alertnotifications ALTER COLUMN notificationid SET DEFAULT nextval('"IoT".alertnotifications_notificationid_seq'::regclass);
 O   ALTER TABLE "IoT".alertnotifications ALTER COLUMN notificationid DROP DEFAULT;
       IoT          postgres    false    211    210            �           2604    17765    customers customerid    DEFAULT     z   ALTER TABLE ONLY "IoT".customers ALTER COLUMN customerid SET DEFAULT nextval('"IoT".customers_customerid_seq'::regclass);
 B   ALTER TABLE "IoT".customers ALTER COLUMN customerid DROP DEFAULT;
       IoT          postgres    false    213    212            �           2604    17766    departments departmentid    DEFAULT     �   ALTER TABLE ONLY "IoT".departments ALTER COLUMN departmentid SET DEFAULT nextval('"IoT".departments_departmentid_seq'::regclass);
 F   ALTER TABLE "IoT".departments ALTER COLUMN departmentid DROP DEFAULT;
       IoT          postgres    false    215    214            �           2604    17767    devices deviceid    DEFAULT     r   ALTER TABLE ONLY "IoT".devices ALTER COLUMN deviceid SET DEFAULT nextval('"IoT".devices_deviceid_seq'::regclass);
 >   ALTER TABLE "IoT".devices ALTER COLUMN deviceid DROP DEFAULT;
       IoT          postgres    false    217    216            �           2604    17768    escalationlevels levelid    DEFAULT     �   ALTER TABLE ONLY "IoT".escalationlevels ALTER COLUMN levelid SET DEFAULT nextval('"IoT".escalationlevels_levelid_seq'::regclass);
 F   ALTER TABLE "IoT".escalationlevels ALTER COLUMN levelid DROP DEFAULT;
       IoT          postgres    false    219    218            �           2604    17769    gatewayfailures failureid    DEFAULT     �   ALTER TABLE ONLY "IoT".gatewayfailures ALTER COLUMN failureid SET DEFAULT nextval('"IoT".gatewayfailures_failureid_seq'::regclass);
 G   ALTER TABLE "IoT".gatewayfailures ALTER COLUMN failureid DROP DEFAULT;
       IoT          postgres    false    221    220            �           2604    17770    gateways gatewayid    DEFAULT     v   ALTER TABLE ONLY "IoT".gateways ALTER COLUMN gatewayid SET DEFAULT nextval('"IoT".gateways_gatewayid_seq'::regclass);
 @   ALTER TABLE "IoT".gateways ALTER COLUMN gatewayid DROP DEFAULT;
       IoT          postgres    false    223    222            �           2604    17771    readings readingid    DEFAULT     v   ALTER TABLE ONLY "IoT".readings ALTER COLUMN readingid SET DEFAULT nextval('"IoT".readings_readingid_seq'::regclass);
 @   ALTER TABLE "IoT".readings ALTER COLUMN readingid DROP DEFAULT;
       IoT          postgres    false    225    224            �           2604    17772    sensors sensorid    DEFAULT     r   ALTER TABLE ONLY "IoT".sensors ALTER COLUMN sensorid SET DEFAULT nextval('"IoT".sensors_sensorid_seq'::regclass);
 >   ALTER TABLE "IoT".sensors ALTER COLUMN sensorid DROP DEFAULT;
       IoT          postgres    false    227    226            �           2604    17773    sensortypes sensortypeid    DEFAULT     �   ALTER TABLE ONLY "IoT".sensortypes ALTER COLUMN sensortypeid SET DEFAULT nextval('"IoT".sensortypes_sensortypeid_seq'::regclass);
 F   ALTER TABLE "IoT".sensortypes ALTER COLUMN sensortypeid DROP DEFAULT;
       IoT          postgres    false    229    228            �           2604    17774    staff staffid    DEFAULT     l   ALTER TABLE ONLY "IoT".staff ALTER COLUMN staffid SET DEFAULT nextval('"IoT".staff_staffid_seq'::regclass);
 ;   ALTER TABLE "IoT".staff ALTER COLUMN staffid DROP DEFAULT;
       IoT          postgres    false    231    230            �           2604    17775 "   staffdeviceassignment assignmentid    DEFAULT     �   ALTER TABLE ONLY "IoT".staffdeviceassignment ALTER COLUMN assignmentid SET DEFAULT nextval('"IoT".staffdeviceassignment_assignmentid_seq'::regclass);
 P   ALTER TABLE "IoT".staffdeviceassignment ALTER COLUMN assignmentid DROP DEFAULT;
       IoT          postgres    false    233    232            �          0    17038    alertnotifications 
   TABLE DATA           �   COPY "IoT".alertnotifications (notificationid, staffid, deviceid, thresholdminvalue, thresholdmaxvalue, notificationtime, lastacknowledgmenttime, escalationlevel) FROM stdin;
    IoT          postgres    false    210   ��                 0    17570    alerts 
   TABLE DATA           �   COPY "IoT".alerts (alertid, sensorid, alerttype, readingvalue, "timestamp", acknowledgedby, escalatedto, isgatewayfailurealert) FROM stdin;
    IoT          postgres    false    247   �                 0    17614    alertstatus 
   TABLE DATA           F   COPY "IoT".alertstatus (alertid, status, statustimestamp) FROM stdin;
    IoT          postgres    false    251   3�       �          0    17048 	   customers 
   TABLE DATA           �   COPY "IoT".customers (customerid, customername, contactperson, email, phone, address, city, is_active, date_created, date_updated, is_deleted, created_by, updated_by) FROM stdin;
    IoT          postgres    false    212   P�       �          0    17055    departments 
   TABLE DATA           �   COPY "IoT".departments (departmentid, departmentname, customerid, location, is_active, date_created, date_updated, is_deleted, facilityid, created_by, updated_by) FROM stdin;
    IoT          postgres    false    214   m�       �          0    17060    devices 
   TABLE DATA           �   COPY "IoT".devices (deviceid, devicename, departmentid, devicetype, manufacturer, is_active, date_created, date_updated, is_deleted, facilityid, customerid, created_by, updated_by) FROM stdin;
    IoT          postgres    false    216   ��       �          0    17065    escalationlevels 
   TABLE DATA           J   COPY "IoT".escalationlevels (levelid, levelname, description) FROM stdin;
    IoT          postgres    false    218   ��                 0    17592    escalationstatus 
   TABLE DATA           ]   COPY "IoT".escalationstatus (alertid, levelid, staffid, lastescalationtimestamp) FROM stdin;
    IoT          postgres    false    249   ��                 0    17545 
   facilities 
   TABLE DATA           �   COPY "IoT".facilities (facilityid, name, location, address, contactname, contactphonenumber, email, isfacilityadmin, is_active, is_deleted, date_created, date_updated, customerid, created_by, updated_by) FROM stdin;
    IoT          postgres    false    245   ��       �          0    17074    gatewayfailures 
   TABLE DATA           c   COPY "IoT".gatewayfailures (failureid, gatewayid, failuretimestamp, recoverytimestamp) FROM stdin;
    IoT          postgres    false    220   ��       �          0    17078    gateways 
   TABLE DATA           �   COPY "IoT".gateways (gatewayid, gatewayname, location, customerid, is_active, date_created, date_updated, is_deleted, created_by, updated_by) FROM stdin;
    IoT          postgres    false    222   �       �          0    17083    readings 
   TABLE DATA           t   COPY "IoT".readings (readingid, sensorid, deviceid, gatewayid, measure, sensorvalue, reading_timestamp) FROM stdin;
    IoT          postgres    false    224   8�       �          0    17531    rolepermissions 
   TABLE DATA           c   COPY "IoT".rolepermissions (rolepermissionid, roleid, permissiontype, permissionvalue) FROM stdin;
    IoT          postgres    false    243   U�       �          0    17473    roles 
   TABLE DATA           S   COPY "IoT".roles (roleid, name, normalizedname, is_active, is_deleted) FROM stdin;
    IoT          postgres    false    235   #�       �          0    17514    sensorgatewayassignment 
   TABLE DATA           E   COPY "IoT".sensorgatewayassignment (sensorid, gatewayid) FROM stdin;
    IoT          postgres    false    241   ��       �          0    17090    sensors 
   TABLE DATA           �   COPY "IoT".sensors (sensorid, deviceid, is_active, customerid, is_deleted, aws_sensorid, date_created, date_updated, assigned_by) FROM stdin;
    IoT          postgres    false    226   ��       �          0    17095    sensortypes 
   TABLE DATA           �   COPY "IoT".sensortypes (sensortypeid, sensortypename, measurementunit, minvalue, maxvalue, sensorid, aws_sensorid, is_hidden, is_deleted, date_created, date_updated, updated_by) FROM stdin;
    IoT          postgres    false    228   ��       �          0    17099    staff 
   TABLE DATA           �   COPY "IoT".staff (staffid, deviceid, name, email, phone, pager, departmentid, isdepartmenthead, is_active, notificationstarttime, notificationendtime, weekdaysonly, date_created, date_updated, created_by, updated_by, is_deleted) FROM stdin;
    IoT          postgres    false    230    �       �          0    17106    staffdeviceassignment 
   TABLE DATA           O   COPY "IoT".staffdeviceassignment (assignmentid, staffid, deviceid) FROM stdin;
    IoT          postgres    false    232   �       �          0    17497 	   userroles 
   TABLE DATA           >   COPY "IoT".userroles (userroleid, roleid, userid) FROM stdin;
    IoT          postgres    false    239   :�       �          0    17484    users 
   TABLE DATA           �   COPY "IoT".users (userid, firstname, lastname, email, address, passwordhash, phonenumber, createdby, updatedby, is_active, is_deleted, date_created, date_updated, resettoken) FROM stdin;
    IoT          postgres    false    237   ^�                  0    0 %   alertnotifications_notificationid_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('"IoT".alertnotifications_notificationid_seq', 1, false);
          IoT          postgres    false    211                       0    0    alerts_alertid_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('"IoT".alerts_alertid_seq', 1, false);
          IoT          postgres    false    246                       0    0    alertstatus_alertid_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('"IoT".alertstatus_alertid_seq', 1, false);
          IoT          postgres    false    250                       0    0    customers_customerid_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('"IoT".customers_customerid_seq', 1, true);
          IoT          postgres    false    213                       0    0    departments_departmentid_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('"IoT".departments_departmentid_seq', 1, false);
          IoT          postgres    false    215                       0    0    devices_deviceid_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('"IoT".devices_deviceid_seq', 1, false);
          IoT          postgres    false    217                        0    0    escalationlevels_levelid_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('"IoT".escalationlevels_levelid_seq', 1, false);
          IoT          postgres    false    219            !           0    0    escalationstatus_alertid_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('"IoT".escalationstatus_alertid_seq', 1, false);
          IoT          postgres    false    248            "           0    0    facilities_facilityid_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('"IoT".facilities_facilityid_seq', 1, false);
          IoT          postgres    false    244            #           0    0    gatewayfailures_failureid_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('"IoT".gatewayfailures_failureid_seq', 1, false);
          IoT          postgres    false    221            $           0    0    gateways_gatewayid_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('"IoT".gateways_gatewayid_seq', 1, false);
          IoT          postgres    false    223            %           0    0    readings_readingid_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('"IoT".readings_readingid_seq', 1, false);
          IoT          postgres    false    225            &           0    0 $   rolepermissions_rolepermissionid_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('"IoT".rolepermissions_rolepermissionid_seq', 77, true);
          IoT          postgres    false    242            '           0    0    roles_roleid_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('"IoT".roles_roleid_seq', 7, true);
          IoT          postgres    false    234            (           0    0 $   sensorgatewayassignment_sensorid_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('"IoT".sensorgatewayassignment_sensorid_seq', 1, false);
          IoT          postgres    false    240            )           0    0    sensors_sensorid_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('"IoT".sensors_sensorid_seq', 1, false);
          IoT          postgres    false    227            *           0    0    sensortypes_sensortypeid_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('"IoT".sensortypes_sensortypeid_seq', 1, false);
          IoT          postgres    false    229            +           0    0    staff_staffid_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('"IoT".staff_staffid_seq', 1, false);
          IoT          postgres    false    231            ,           0    0 &   staffdeviceassignment_assignmentid_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('"IoT".staffdeviceassignment_assignmentid_seq', 1, false);
          IoT          postgres    false    233            -           0    0    userroles_userroleid_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('"IoT".userroles_userroleid_seq', 16, true);
          IoT          postgres    false    238            .           0    0    users_userid_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('"IoT".users_userid_seq', 1, true);
          IoT          postgres    false    236            �           2606    17123 *   alertnotifications alertnotifications_pkey 
   CONSTRAINT     s   ALTER TABLE ONLY "IoT".alertnotifications
    ADD CONSTRAINT alertnotifications_pkey PRIMARY KEY (notificationid);
 S   ALTER TABLE ONLY "IoT".alertnotifications DROP CONSTRAINT alertnotifications_pkey;
       IoT            postgres    false    210            !           2606    17575    alerts alerts_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY "IoT".alerts
    ADD CONSTRAINT alerts_pkey PRIMARY KEY (alertid);
 ;   ALTER TABLE ONLY "IoT".alerts DROP CONSTRAINT alerts_pkey;
       IoT            postgres    false    247            %           2606    17619    alertstatus alertstatus_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY "IoT".alertstatus
    ADD CONSTRAINT alertstatus_pkey PRIMARY KEY (alertid);
 E   ALTER TABLE ONLY "IoT".alertstatus DROP CONSTRAINT alertstatus_pkey;
       IoT            postgres    false    251            �           2606    17129    customers customers_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY "IoT".customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customerid);
 A   ALTER TABLE ONLY "IoT".customers DROP CONSTRAINT customers_pkey;
       IoT            postgres    false    212                       2606    17131    departments departments_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY "IoT".departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (departmentid);
 E   ALTER TABLE ONLY "IoT".departments DROP CONSTRAINT departments_pkey;
       IoT            postgres    false    214                       2606    17133    devices devices_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY "IoT".devices
    ADD CONSTRAINT devices_pkey PRIMARY KEY (deviceid);
 =   ALTER TABLE ONLY "IoT".devices DROP CONSTRAINT devices_pkey;
       IoT            postgres    false    216                       2606    17135 &   escalationlevels escalationlevels_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY "IoT".escalationlevels
    ADD CONSTRAINT escalationlevels_pkey PRIMARY KEY (levelid);
 O   ALTER TABLE ONLY "IoT".escalationlevels DROP CONSTRAINT escalationlevels_pkey;
       IoT            postgres    false    218            #           2606    17597 &   escalationstatus escalationstatus_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY "IoT".escalationstatus
    ADD CONSTRAINT escalationstatus_pkey PRIMARY KEY (alertid);
 O   ALTER TABLE ONLY "IoT".escalationstatus DROP CONSTRAINT escalationstatus_pkey;
       IoT            postgres    false    249                       2606    17556    facilities facilities_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY "IoT".facilities
    ADD CONSTRAINT facilities_pkey PRIMARY KEY (facilityid);
 C   ALTER TABLE ONLY "IoT".facilities DROP CONSTRAINT facilities_pkey;
       IoT            postgres    false    245                       2606    17139 $   gatewayfailures gatewayfailures_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY "IoT".gatewayfailures
    ADD CONSTRAINT gatewayfailures_pkey PRIMARY KEY (failureid);
 M   ALTER TABLE ONLY "IoT".gatewayfailures DROP CONSTRAINT gatewayfailures_pkey;
       IoT            postgres    false    220            	           2606    17141    gateways gateways_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY "IoT".gateways
    ADD CONSTRAINT gateways_pkey PRIMARY KEY (gatewayid);
 ?   ALTER TABLE ONLY "IoT".gateways DROP CONSTRAINT gateways_pkey;
       IoT            postgres    false    222                       2606    17143    readings readings_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY "IoT".readings
    ADD CONSTRAINT readings_pkey PRIMARY KEY (readingid);
 ?   ALTER TABLE ONLY "IoT".readings DROP CONSTRAINT readings_pkey;
       IoT            postgres    false    224                       2606    17538 $   rolepermissions rolepermissions_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY "IoT".rolepermissions
    ADD CONSTRAINT rolepermissions_pkey PRIMARY KEY (rolepermissionid);
 M   ALTER TABLE ONLY "IoT".rolepermissions DROP CONSTRAINT rolepermissions_pkey;
       IoT            postgres    false    243                       2606    17482    roles roles_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY "IoT".roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (roleid);
 9   ALTER TABLE ONLY "IoT".roles DROP CONSTRAINT roles_pkey;
       IoT            postgres    false    235                       2606    17519 4   sensorgatewayassignment sensorgatewayassignment_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY "IoT".sensorgatewayassignment
    ADD CONSTRAINT sensorgatewayassignment_pkey PRIMARY KEY (sensorid, gatewayid);
 ]   ALTER TABLE ONLY "IoT".sensorgatewayassignment DROP CONSTRAINT sensorgatewayassignment_pkey;
       IoT            postgres    false    241    241                       2606    17147    sensors sensors_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY "IoT".sensors
    ADD CONSTRAINT sensors_pkey PRIMARY KEY (sensorid);
 =   ALTER TABLE ONLY "IoT".sensors DROP CONSTRAINT sensors_pkey;
       IoT            postgres    false    226                       2606    17149    sensortypes sensortypes_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY "IoT".sensortypes
    ADD CONSTRAINT sensortypes_pkey PRIMARY KEY (sensortypeid);
 E   ALTER TABLE ONLY "IoT".sensortypes DROP CONSTRAINT sensortypes_pkey;
       IoT            postgres    false    228                       2606    17151    staff staff_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY "IoT".staff
    ADD CONSTRAINT staff_pkey PRIMARY KEY (staffid);
 9   ALTER TABLE ONLY "IoT".staff DROP CONSTRAINT staff_pkey;
       IoT            postgres    false    230                       2606    17153 0   staffdeviceassignment staffdeviceassignment_pkey 
   CONSTRAINT     w   ALTER TABLE ONLY "IoT".staffdeviceassignment
    ADD CONSTRAINT staffdeviceassignment_pkey PRIMARY KEY (assignmentid);
 Y   ALTER TABLE ONLY "IoT".staffdeviceassignment DROP CONSTRAINT staffdeviceassignment_pkey;
       IoT            postgres    false    232                       2606    17502    userroles userroles_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY "IoT".userroles
    ADD CONSTRAINT userroles_pkey PRIMARY KEY (userroleid);
 A   ALTER TABLE ONLY "IoT".userroles DROP CONSTRAINT userroles_pkey;
       IoT            postgres    false    239                       2606    17495    users users_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY "IoT".users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);
 9   ALTER TABLE ONLY "IoT".users DROP CONSTRAINT users_pkey;
       IoT            postgres    false    237            &           2606    17154 3   alertnotifications alertnotifications_deviceid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".alertnotifications
    ADD CONSTRAINT alertnotifications_deviceid_fkey FOREIGN KEY (deviceid) REFERENCES "IoT".devices(deviceid);
 \   ALTER TABLE ONLY "IoT".alertnotifications DROP CONSTRAINT alertnotifications_deviceid_fkey;
       IoT          postgres    false    216    210    3331            '           2606    17159 2   alertnotifications alertnotifications_staffid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".alertnotifications
    ADD CONSTRAINT alertnotifications_staffid_fkey FOREIGN KEY (staffid) REFERENCES "IoT".staff(staffid);
 [   ALTER TABLE ONLY "IoT".alertnotifications DROP CONSTRAINT alertnotifications_staffid_fkey;
       IoT          postgres    false    210    230    3345            L           2606    17576 !   alerts alerts_acknowledgedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".alerts
    ADD CONSTRAINT alerts_acknowledgedby_fkey FOREIGN KEY (acknowledgedby) REFERENCES "IoT".staff(staffid);
 J   ALTER TABLE ONLY "IoT".alerts DROP CONSTRAINT alerts_acknowledgedby_fkey;
       IoT          postgres    false    230    3345    247            M           2606    17581    alerts alerts_escalatedto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".alerts
    ADD CONSTRAINT alerts_escalatedto_fkey FOREIGN KEY (escalatedto) REFERENCES "IoT".staff(staffid);
 G   ALTER TABLE ONLY "IoT".alerts DROP CONSTRAINT alerts_escalatedto_fkey;
       IoT          postgres    false    247    3345    230            N           2606    17586    alerts alerts_sensorid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".alerts
    ADD CONSTRAINT alerts_sensorid_fkey FOREIGN KEY (sensorid) REFERENCES "IoT".sensors(sensorid);
 D   ALTER TABLE ONLY "IoT".alerts DROP CONSTRAINT alerts_sensorid_fkey;
       IoT          postgres    false    247    226    3341            R           2606    17620 $   alertstatus alertstatus_alertid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".alertstatus
    ADD CONSTRAINT alertstatus_alertid_fkey FOREIGN KEY (alertid) REFERENCES "IoT".alerts(alertid);
 M   ALTER TABLE ONLY "IoT".alertstatus DROP CONSTRAINT alertstatus_alertid_fkey;
       IoT          postgres    false    3361    247    251            (           2606    17657 "   customers customers_createdby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".customers
    ADD CONSTRAINT customers_createdby_fkey FOREIGN KEY (created_by) REFERENCES "IoT".users(userid) NOT VALID;
 K   ALTER TABLE ONLY "IoT".customers DROP CONSTRAINT customers_createdby_fkey;
       IoT          postgres    false    237    212    3351            )           2606    17662 "   customers customers_updatedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".customers
    ADD CONSTRAINT customers_updatedby_fkey FOREIGN KEY (updated_by) REFERENCES "IoT".users(userid) NOT VALID;
 K   ALTER TABLE ONLY "IoT".customers DROP CONSTRAINT customers_updatedby_fkey;
       IoT          postgres    false    237    3351    212            *           2606    17677 &   departments departments_createdby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".departments
    ADD CONSTRAINT departments_createdby_fkey FOREIGN KEY (created_by) REFERENCES "IoT".users(userid) NOT VALID;
 O   ALTER TABLE ONLY "IoT".departments DROP CONSTRAINT departments_createdby_fkey;
       IoT          postgres    false    237    3351    214            +           2606    17687 '   departments departments_customerid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".departments
    ADD CONSTRAINT departments_customerid_fkey FOREIGN KEY (customerid) REFERENCES "IoT".customers(customerid) NOT VALID;
 P   ALTER TABLE ONLY "IoT".departments DROP CONSTRAINT departments_customerid_fkey;
       IoT          postgres    false    3327    214    212            ,           2606    17630 '   departments departments_facilityid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".departments
    ADD CONSTRAINT departments_facilityid_fkey FOREIGN KEY (facilityid) REFERENCES "IoT".facilities(facilityid) NOT VALID;
 P   ALTER TABLE ONLY "IoT".departments DROP CONSTRAINT departments_facilityid_fkey;
       IoT          postgres    false    3359    214    245            -           2606    17682 &   departments departments_updatedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".departments
    ADD CONSTRAINT departments_updatedby_fkey FOREIGN KEY (updated_by) REFERENCES "IoT".users(userid) NOT VALID;
 O   ALTER TABLE ONLY "IoT".departments DROP CONSTRAINT departments_updatedby_fkey;
       IoT          postgres    false    237    3351    214            .           2606    17692    devices devices_createdby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".devices
    ADD CONSTRAINT devices_createdby_fkey FOREIGN KEY (created_by) REFERENCES "IoT".users(userid) NOT VALID;
 G   ALTER TABLE ONLY "IoT".devices DROP CONSTRAINT devices_createdby_fkey;
       IoT          postgres    false    3351    237    216            /           2606    17642    devices devices_customerid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".devices
    ADD CONSTRAINT devices_customerid_fkey FOREIGN KEY (customerid) REFERENCES "IoT".customers(customerid) NOT VALID;
 H   ALTER TABLE ONLY "IoT".devices DROP CONSTRAINT devices_customerid_fkey;
       IoT          postgres    false    3327    212    216            0           2606    17189 !   devices devices_departmentid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".devices
    ADD CONSTRAINT devices_departmentid_fkey FOREIGN KEY (departmentid) REFERENCES "IoT".departments(departmentid);
 J   ALTER TABLE ONLY "IoT".devices DROP CONSTRAINT devices_departmentid_fkey;
       IoT          postgres    false    214    216    3329            1           2606    17637    devices devices_facilityid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".devices
    ADD CONSTRAINT devices_facilityid_fkey FOREIGN KEY (facilityid) REFERENCES "IoT".facilities(facilityid) NOT VALID;
 H   ALTER TABLE ONLY "IoT".devices DROP CONSTRAINT devices_facilityid_fkey;
       IoT          postgres    false    216    245    3359            2           2606    17697    devices devices_updatedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".devices
    ADD CONSTRAINT devices_updatedby_fkey FOREIGN KEY (updated_by) REFERENCES "IoT".users(userid) NOT VALID;
 G   ALTER TABLE ONLY "IoT".devices DROP CONSTRAINT devices_updatedby_fkey;
       IoT          postgres    false    237    3351    216            O           2606    17598 .   escalationstatus escalationstatus_alertid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".escalationstatus
    ADD CONSTRAINT escalationstatus_alertid_fkey FOREIGN KEY (alertid) REFERENCES "IoT".alerts(alertid);
 W   ALTER TABLE ONLY "IoT".escalationstatus DROP CONSTRAINT escalationstatus_alertid_fkey;
       IoT          postgres    false    3361    247    249            P           2606    17603 .   escalationstatus escalationstatus_levelid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".escalationstatus
    ADD CONSTRAINT escalationstatus_levelid_fkey FOREIGN KEY (levelid) REFERENCES "IoT".escalationlevels(levelid);
 W   ALTER TABLE ONLY "IoT".escalationstatus DROP CONSTRAINT escalationstatus_levelid_fkey;
       IoT          postgres    false    218    3333    249            Q           2606    17608 .   escalationstatus escalationstatus_staffid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".escalationstatus
    ADD CONSTRAINT escalationstatus_staffid_fkey FOREIGN KEY (staffid) REFERENCES "IoT".staff(staffid);
 W   ALTER TABLE ONLY "IoT".escalationstatus DROP CONSTRAINT escalationstatus_staffid_fkey;
       IoT          postgres    false    230    3345    249            I           2606    17667 $   facilities facilities_createdby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".facilities
    ADD CONSTRAINT facilities_createdby_fkey FOREIGN KEY (created_by) REFERENCES "IoT".users(userid) NOT VALID;
 M   ALTER TABLE ONLY "IoT".facilities DROP CONSTRAINT facilities_createdby_fkey;
       IoT          postgres    false    3351    245    237            J           2606    17557 %   facilities facilities_customerid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".facilities
    ADD CONSTRAINT facilities_customerid_fkey FOREIGN KEY (customerid) REFERENCES "IoT".customers(customerid);
 N   ALTER TABLE ONLY "IoT".facilities DROP CONSTRAINT facilities_customerid_fkey;
       IoT          postgres    false    212    245    3327            K           2606    17672 $   facilities facilities_updatedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".facilities
    ADD CONSTRAINT facilities_updatedby_fkey FOREIGN KEY (updated_by) REFERENCES "IoT".users(userid) NOT VALID;
 M   ALTER TABLE ONLY "IoT".facilities DROP CONSTRAINT facilities_updatedby_fkey;
       IoT          postgres    false    3351    237    245            3           2606    17209 .   gatewayfailures gatewayfailures_gatewayid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".gatewayfailures
    ADD CONSTRAINT gatewayfailures_gatewayid_fkey FOREIGN KEY (gatewayid) REFERENCES "IoT".gateways(gatewayid);
 W   ALTER TABLE ONLY "IoT".gatewayfailures DROP CONSTRAINT gatewayfailures_gatewayid_fkey;
       IoT          postgres    false    220    3337    222            4           2606    17702     gateways gateways_createdby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".gateways
    ADD CONSTRAINT gateways_createdby_fkey FOREIGN KEY (created_by) REFERENCES "IoT".users(userid) NOT VALID;
 I   ALTER TABLE ONLY "IoT".gateways DROP CONSTRAINT gateways_createdby_fkey;
       IoT          postgres    false    237    3351    222            5           2606    17214 !   gateways gateways_customerid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".gateways
    ADD CONSTRAINT gateways_customerid_fkey FOREIGN KEY (customerid) REFERENCES "IoT".customers(customerid);
 J   ALTER TABLE ONLY "IoT".gateways DROP CONSTRAINT gateways_customerid_fkey;
       IoT          postgres    false    222    3327    212            6           2606    17707     gateways gateways_updatedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".gateways
    ADD CONSTRAINT gateways_updatedby_fkey FOREIGN KEY (updated_by) REFERENCES "IoT".users(userid) NOT VALID;
 I   ALTER TABLE ONLY "IoT".gateways DROP CONSTRAINT gateways_updatedby_fkey;
       IoT          postgres    false    3351    237    222            7           2606    17219    readings readings_deviceid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".readings
    ADD CONSTRAINT readings_deviceid_fkey FOREIGN KEY (deviceid) REFERENCES "IoT".devices(deviceid);
 H   ALTER TABLE ONLY "IoT".readings DROP CONSTRAINT readings_deviceid_fkey;
       IoT          postgres    false    224    3331    216            8           2606    17224     readings readings_gatewayid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".readings
    ADD CONSTRAINT readings_gatewayid_fkey FOREIGN KEY (gatewayid) REFERENCES "IoT".gateways(gatewayid);
 I   ALTER TABLE ONLY "IoT".readings DROP CONSTRAINT readings_gatewayid_fkey;
       IoT          postgres    false    224    3337    222            9           2606    17229    readings readings_sensorid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".readings
    ADD CONSTRAINT readings_sensorid_fkey FOREIGN KEY (sensorid) REFERENCES "IoT".sensors(sensorid);
 H   ALTER TABLE ONLY "IoT".readings DROP CONSTRAINT readings_sensorid_fkey;
       IoT          postgres    false    224    226    3341            H           2606    17539 +   rolepermissions rolepermissions_roleid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".rolepermissions
    ADD CONSTRAINT rolepermissions_roleid_fkey FOREIGN KEY (roleid) REFERENCES "IoT".roles(roleid);
 T   ALTER TABLE ONLY "IoT".rolepermissions DROP CONSTRAINT rolepermissions_roleid_fkey;
       IoT          postgres    false    243    3349    235            F           2606    17520 >   sensorgatewayassignment sensorgatewayassignment_gatewayid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".sensorgatewayassignment
    ADD CONSTRAINT sensorgatewayassignment_gatewayid_fkey FOREIGN KEY (gatewayid) REFERENCES "IoT".gateways(gatewayid);
 g   ALTER TABLE ONLY "IoT".sensorgatewayassignment DROP CONSTRAINT sensorgatewayassignment_gatewayid_fkey;
       IoT          postgres    false    241    222    3337            G           2606    17525 =   sensorgatewayassignment sensorgatewayassignment_sensorid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".sensorgatewayassignment
    ADD CONSTRAINT sensorgatewayassignment_sensorid_fkey FOREIGN KEY (sensorid) REFERENCES "IoT".sensors(sensorid);
 f   ALTER TABLE ONLY "IoT".sensorgatewayassignment DROP CONSTRAINT sensorgatewayassignment_sensorid_fkey;
       IoT          postgres    false    3341    226    241            :           2606    17717    sensors sensors_assignedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".sensors
    ADD CONSTRAINT sensors_assignedby_fkey FOREIGN KEY (assigned_by) REFERENCES "IoT".users(userid) NOT VALID;
 H   ALTER TABLE ONLY "IoT".sensors DROP CONSTRAINT sensors_assignedby_fkey;
       IoT          postgres    false    226    237    3351            ;           2606    17712    sensors sensors_customerid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".sensors
    ADD CONSTRAINT sensors_customerid_fkey FOREIGN KEY (customerid) REFERENCES "IoT".customers(customerid) NOT VALID;
 H   ALTER TABLE ONLY "IoT".sensors DROP CONSTRAINT sensors_customerid_fkey;
       IoT          postgres    false    212    3327    226            <           2606    17244    sensors sensors_deviceid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".sensors
    ADD CONSTRAINT sensors_deviceid_fkey FOREIGN KEY (deviceid) REFERENCES "IoT".devices(deviceid);
 F   ALTER TABLE ONLY "IoT".sensors DROP CONSTRAINT sensors_deviceid_fkey;
       IoT          postgres    false    216    3331    226            =           2606    17722 %   sensortypes sensortypes_sensorid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".sensortypes
    ADD CONSTRAINT sensortypes_sensorid_fkey FOREIGN KEY (sensorid) REFERENCES "IoT".sensors(sensorid) NOT VALID;
 N   ALTER TABLE ONLY "IoT".sensortypes DROP CONSTRAINT sensortypes_sensorid_fkey;
       IoT          postgres    false    3341    228    226            >           2606    17727 &   sensortypes sensortypes_updatedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".sensortypes
    ADD CONSTRAINT sensortypes_updatedby_fkey FOREIGN KEY (updated_by) REFERENCES "IoT".users(userid) NOT VALID;
 O   ALTER TABLE ONLY "IoT".sensortypes DROP CONSTRAINT sensortypes_updatedby_fkey;
       IoT          postgres    false    237    3351    228            ?           2606    17647    staff staff_createdby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".staff
    ADD CONSTRAINT staff_createdby_fkey FOREIGN KEY (created_by) REFERENCES "IoT".users(userid) NOT VALID;
 C   ALTER TABLE ONLY "IoT".staff DROP CONSTRAINT staff_createdby_fkey;
       IoT          postgres    false    3351    230    237            @           2606    17254    staff staff_departmentid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".staff
    ADD CONSTRAINT staff_departmentid_fkey FOREIGN KEY (departmentid) REFERENCES "IoT".departments(departmentid);
 F   ALTER TABLE ONLY "IoT".staff DROP CONSTRAINT staff_departmentid_fkey;
       IoT          postgres    false    3329    214    230            A           2606    17652    staff staff_updatedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".staff
    ADD CONSTRAINT staff_updatedby_fkey FOREIGN KEY (updated_by) REFERENCES "IoT".users(userid) NOT VALID;
 C   ALTER TABLE ONLY "IoT".staff DROP CONSTRAINT staff_updatedby_fkey;
       IoT          postgres    false    3351    237    230            B           2606    17259 9   staffdeviceassignment staffdeviceassignment_deviceid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".staffdeviceassignment
    ADD CONSTRAINT staffdeviceassignment_deviceid_fkey FOREIGN KEY (deviceid) REFERENCES "IoT".devices(deviceid);
 b   ALTER TABLE ONLY "IoT".staffdeviceassignment DROP CONSTRAINT staffdeviceassignment_deviceid_fkey;
       IoT          postgres    false    3331    232    216            C           2606    17264 8   staffdeviceassignment staffdeviceassignment_staffid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY "IoT".staffdeviceassignment
    ADD CONSTRAINT staffdeviceassignment_staffid_fkey FOREIGN KEY (staffid) REFERENCES "IoT".staff(staffid);
 a   ALTER TABLE ONLY "IoT".staffdeviceassignment DROP CONSTRAINT staffdeviceassignment_staffid_fkey;
       IoT          postgres    false    3345    230    232            D           2606    17503    userroles userroles_roleid_fkey    FK CONSTRAINT        ALTER TABLE ONLY "IoT".userroles
    ADD CONSTRAINT userroles_roleid_fkey FOREIGN KEY (roleid) REFERENCES "IoT".roles(roleid);
 H   ALTER TABLE ONLY "IoT".userroles DROP CONSTRAINT userroles_roleid_fkey;
       IoT          postgres    false    235    239    3349            E           2606    17508    userroles userroles_userid_fkey    FK CONSTRAINT        ALTER TABLE ONLY "IoT".userroles
    ADD CONSTRAINT userroles_userid_fkey FOREIGN KEY (userid) REFERENCES "IoT".users(userid);
 H   ALTER TABLE ONLY "IoT".userroles DROP CONSTRAINT userroles_userid_fkey;
       IoT          postgres    false    239    237    3351            �      x������ � �            x������ � �            x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �            x������ � �            x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   �  x����N�@F��Ð�?�%l5\�ipb�@!m�ѧ�^�������,N9�kЕ��p�Ʊ;���q��x��Gm�n��k+`����l���y���E-H�-%��VGv��������b�T!M�J�d�@��g{�j��}7}�9�u%�$��l�]Y������!����	K�TLhr֠bB�����ŋ��c[P�H6ՈdK��)��^�"�-A-"��"�,��t�k�	/p�g����r���dV$�M��L�*`���y����)b�T�]��n�dA�tM4��dA�|MT���@�tM����@�|M����le�59'Pl�������r���9�*���7E,�zUD�����F���<��ߧ�����Uz����ӃZ�}zP*���T��J��2h�$�`D�-�<�����[z�d� �d�����16)-      �   v   x�3��/JO�ˬJ,���sL�����rw��r���st����,�L�2�tKL���,���rst����D�0�.-H-�H��!��9]R�JrS�J 
\\�B|]�B�b���� $�+�      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x�34�4�4����� |�      �   �   x�}�1�0@���)�M[)m���!`@TKKP���������K��;(�qP�]ݭ2n'!���`��a��)�g=�W�M݉������T�CɆd�9��%Nm���ɹ�#��<�엃0%=Jc*b.��� �5j0B�&-�     