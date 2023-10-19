# Use the official ASP.NET Core runtime image as a base image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

# Use the official ASP.NET Core SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["AngularAuthAPI.csproj", "./"]
RUN dotnet restore "AngularAuthAPI.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "AngularAuthAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AngularAuthAPI.csproj" -c Release -o /app/publish

# Copy the published application to the base image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AngularAuthAPI.dll"]
